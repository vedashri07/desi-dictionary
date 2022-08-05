import React, { useState, useContext } from 'react';
import '../assets/css/addword.css';
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from 'react-google-login'

import { ReactComponent as Back } from '../assets/icons/arrow-left-circle.svg';
import { UserContext } from './loginContext';
import { addword } from '../services/addword'
import Modal from 'react-modal';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function Addword(props) {
    const navigate = useNavigate();
    let subtitle, background;

    const initialValues = {

        word: "",
        language: "",
        part_of_speech: "",
        gender: "",
        conjugates: "",
        usage_example: "",
        synonyms: "",
        antonyms: " ",
        region: " ",
        uploaded_zip_code: "",
        def: "",
        anonCheck: "test",

    }
    const [values, setValues] = useState(initialValues);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [apiRes, setapiRes] = useState('')
    const [sucess, setSucess] = useState('')

    const user = useContext(UserContext);
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#F9E007';
        background.style.backgroundColor = "transparent"

    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
            token: localStorage.getItem('token'),
            userid: localStorage.getItem('userid')
        });


    };


    const onSuccess = async (res) => {



        localStorage.setItem('user', JSON.stringify(res))
        try {
            const response = await fetch('https://desidictionary.app/user/login', {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',

                },
                body: JSON.stringify({
                    name: res.profileObj.name,
                    email: res.profileObj.email,
                    google_id: res.profileObj.googleId,
                    picture: res.profileObj.imageUrl,
                    email_verified: "True"
                }),



            });
            const data = await response.json();
            const token = data.Data.token;
            const userid = data.Data.userid;

            localStorage.setItem('token', token);
            localStorage.setItem('userid', userid)
            setIsOpen(false);

            navigate("/addword");


        }
        catch (e) {
            console.log(e)
        }


        {  /* fetch('http://52.201.218.32:5000//user/login', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify({
                name: res.name,
                email: res.email,
                google_id: res.googleId,
                picture: res.imageUrl,
                email_verified: "True"
            }),
        })
            .then((resp) => resp.json())
            .then((data) => console.log(data));


    console.log(res) */}







    }
    const onFailure = (res) => {
        console.log("login failed : res", res)
    }

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType: 'offline',
        prompt: 'consent'
    })

    const submitWord = async (e) => {
        e.preventDefault();

        if (user[0]) {
            var response = await addword(values);
            if ((response.Data).hasOwnProperty('msg')) {
                const msg = 'Thank you. Your definition has been submitted for approval. Would you like to add one more definition?';
                setSucess(true)
                setapiRes(msg)

            }
            else if ((response.Data).hasOwnProperty('errmsg')) {
                const errmsg = 'Failed to upload word'
                setSucess(false)

                setapiRes(errmsg)
            }

            setSuccessModal(true)

        }
        else {
            setIsOpen(true);

        }



    }

    return (
        <div className='container-fluid' >

            <div className='row pt-5'>

                <div className='col-lg-4'>

                </div>
                <div className='col-lg-4 py-2'>
                    <Back onClick={() => navigate('/')} width={35} height={35} viewBox="0 0 20 20" className='d-block  ' />
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                        ariaHideApp={false}
                    >
                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>You need to login first !</h2>
                        <button ref={(_background) => (background = _background)} onClick={signIn}>Go to Login</button>
                        <div></div>

                    </Modal>

                    <div className='addword-form py-5 px-3'>

                        <form>
                            <h4>ADD WORD</h4>
                            <div class="form-group pt-2">
                                <label for="word">Word:</label>
                                <input type="text" class="form-control" id="word" value={values.word} onChange={handleInputChange} name="word" placeholder="Enter word" />
                            </div>
                            <div class="form-group">
                                <label for="desc">Description:</label>
                                <input type="text" class="form-control" id="desc" value={values.def} onChange={handleInputChange} name="def" placeholder="Enter desc" />
                            </div>
                            <div class="form-group">
                                <label for="partofspeech">Part of Speech:</label>
                                <input type="text" class="form-control" id="departofspeechsc" value={values.part_of_speech} onChange={handleInputChange} name="part_of_speech" placeholder="Enter part of speech" />
                            </div>
                            <div class="form-group">
                                <label for="partofspeech">Language:</label>
                                <select id="language" value={values.language} class="form-control" name="language" onChange={handleInputChange} placeholder="Enter language">
                                    <option value="english">English</option>
                                    <option value="unknown">Unknown</option>

                                </select>
                            </div>

                            <div class="form-group">
                                <label for="partofspeech">Gender:</label>
                                <input type="text" class="form-control" id="gender" value={values.gender} onChange={handleInputChange} name="gender" placeholder="Enter gender" />
                            </div>
                            <div class="form-group">
                                <label for="partofspeech">Conjugates:</label>
                                <input type="text" class="form-control" id="conjugates" value={values.conjugates} onChange={handleInputChange} name="conjugates" placeholder="Enter conjugates" />
                            </div>
                            <div class="form-group">
                                <label for="partofspeech">Usage Example:</label>
                                <input type="text" class="form-control" id="example" value={values.usage_example} onChange={handleInputChange} name="usage_example" placeholder="Enter example" />
                            </div>
                            <div class="form-group">
                                <label for="partofspeech">Synonyms:</label>
                                <input type="text" class="form-control" id="synonyms" value={values.synonyms} onChange={handleInputChange} name="synonyms" placeholder="Enter synonyms" />
                            </div>
                            <div class="form-group">
                                <label for="partofspeech">Antonyms:</label>
                                <input type="text" class="form-control" id="anotnyms" value={values.antonyms} onChange={handleInputChange} name="antonyms" placeholder="Enter antonyms" />
                            </div>
                            <div class="form-group">
                                <label for="partofspeech">Region:</label>
                                <input type="text" class="form-control" id="region" value={values.region} onChange={handleInputChange} name="region" placeholder="Enter region" />
                            </div>
                            <div class="form-group">
                                <label for="partofspeech">Zip Code:</label>
                                <input type="text" class="form-control" id="zipcode" value={values.uploaded_zip_code} onChange={handleInputChange} name="uploaded_zip_code" placeholder="Enter zipcode" />
                            </div>
                            <Modal
                                isOpen={successModal}
                                onAfterOpen={afterOpenModal}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                                ariaHideApp={false}
                            >
                                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{apiRes}</h2>

                                {
                                    sucess == true ?
                                        <div>
                                            <button ref={(_background) => (background = _background)} onClick={() => { navigate('/addword') }}>Add another definition </button>
                                            <button ref={(_background) => (background = _background)} onClick={() => { navigate('/') }}>Go back to Home </button>

                                        </div>
                                        :
                                        <div>
                                            <button ref={(_background) => (background = _background)} onClick={() =>{setSuccessModal(false)}}>Try again ! </button>

                                        </div>
                                }


                                <div></div>

                            </Modal>
                            <button type="submit" class="btn" style={{backgroundColor:'white'}} onClick={submitWord}>Submit</button>
                        </form>
                    </div>
                </div>
                <div className='col-lg-4'>
                </div>

            </div>

        </div>
    );
}

export default Addword;