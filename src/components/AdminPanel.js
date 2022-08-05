import React, { useContext, useState, useEffect } from 'react';
import "../assets/css/admin.css"
import { getWords } from '../services/getWords';
import { approveWord } from '../services/approveWord';
import Select from 'react-select'
import { useNavigate } from "react-router-dom";
import { UserContext } from './loginContext';

function AdminPanel(props) {

    let navigate = useNavigate();
    const user = useContext(UserContext);
    console.log(user, "user")
    const [words, setWords] = useState([]);
    const [approve, setApprove] = useState([]);
    const [filterKey, setData] = useState('');
    const [filteredData, setFilteredData] = useState()
    const [wordApproved, setWordApproved] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    var data = {
        data: [
            {
                _id: "",
                word: "[v]erripappa",
                languages: "Telugu",
                postedDate: "2022-02-25",
                partofspeech: "noun",
                userHandle: "Mourya Y",
                definition: "1.Silly fool Madhu: Do you think.........",
                upvote: "321",
                downvote: "17"
            }
        ]
    };
    useEffect(() => {
        let mounted = true;
        getWords()
            .then(items => {
                if (mounted) {


                    setWords(items.Data)
                    console.log(items.Data)
                }
            })

        return () => mounted = false

    }, [])
    const partsofspeech = [
        { value: 'noun', label: 'Noun' },

    ]
    const languages = [
        { value: 'noun', label: 'Noun' },

    ]



    const wordToApprove = (e) => {
        const wordid = document.getElementsByName('id')[0].getAttribute('id');

        setApprove({
            ...approve,
            wordid: wordid,
            action: 'approve',
            token: localStorage.getItem('token'),
            userid: localStorage.getItem('userid')
        });


    }
    useEffect(() => {
        var response = approveWord(approve);
        console.log(response, "approval")


    }, [approve])

    const handleChange = (event) => {
        setData(event.target.value);

        const filter = words.filter(item => item.word === filterKey);
        setFilteredData(filter);
    }





    return (


        <div class="container-fluid">


            <div class="main row">
                <div class="topbar">
                    <div className='text-left '>
                        <h3 className='header-text' ><a className='text-capitalize btn btn-link' href='http://desidict.com '>Desi Dictionary</a></h3>

                    </div>

                    <div className='d-flex' >

                        <div className='d-flex align-items-baseline' onClick={() => navigate('/')} >
                            <i className="bi bi-house" style={{ fontSize: 'x-large' }}></i>
                            <div className='ml-2'>Home</div>
                        </div>
                        <div className='admin'>
                            <div>Admin</div>
                            {
                                user[0] ?

                                    <div className="user">
                                        <img  src={user[0].profileObj.imageUrl != undefined ? user[0].profileObj.imageUrl : ''} alt="" />
                                    </div>


                                    : ''

                            }


                        </div>

                    </div>



                </div>
                <div className='mt-2 d-inline-flex'>
                    <div class="search">
                        <label>
                            <input type="text" placeholder="Search word here" onChange={handleChange} />
                            <ion-icon name="search-outline"></ion-icon>
                        </label>
                    </div>

                    {/*<div className='d-inline-flex justify-content-between'>
                        <Select className='filter' placeholder="Filter by part of speech" style={{ width: '250px' }} onChange={setSelectedOption}
                            options={partsofspeech} />
                        <Select className='filter' placeholder="Filter by language" style={{ width: '250px' }} options={languages} />

                        </div>*/}


                </div>

                <div class="cardBox">



                    {

                        filterKey ?

                            filteredData.map(items => {

                                return (
                                    <div id={items._id} name="id" class="wordcard" v-for="user in users">
                                        <div class="header">
                                            <span class="subHeaderText">{items.partofspeech},{items.languages}</span>
                                            <span class="headerText">{items.word}</span>
                                        </div>
                                        <div class="footer">
                                            <span class="descriptionText">Def: {items.definition}</span>
                                            <div class=" d-flex justify-content-between">

                                                <span class="descriptionText">like :{items.upvote}</span>
                                                <span class="descriptionText">dislike :{items.downvote}</span>

                                            </div>
                                            <span class="descriptionText">{items.userHandle}</span>


                                            <div>
                                                <button onClick={wordToApprove} class="pending">Pending</button>
                                            </div>

                                        </div>
                                    </div>
                                )


                            }) :



                            words.map(item => {


                                return (
                                    <div id={item._id} name="id" class="wordcard" v-for="user in users">
                                        <div class="header">
                                            <span class="subHeaderText">{item.partofspeech},{item.languages}</span>
                                            <span class="headerText">{item.word}</span>
                                        </div>
                                        <div class="footer">
                                            <span class="descriptionText">Def: {item.definition}</span>
                                            <div class=" d-flex justify-content-between">

                                                <span class="descriptionText">like :{item.upvote}</span>
                                                <span class="descriptionText">dislike :{item.downvote}</span>

                                            </div>
                                            <span class="descriptionText">{item.userHandle}</span>


                                            <div className='d-flex justify-content-between'>
                                                <button onClick={wordToApprove} class="pending">Approve</button>
                                                <button onClick={wordToApprove} class="pending" style={{backgroundColor:'indianred'}}>Reject</button>

                                            </div>

                                        </div>
                                    </div>
                                )

                            })
                    }


                    {/*<div class="card">
                        <div className='text-start'>
                            <div className='d-flex justify-content-between cardname'>
                                <div >Noun</div>
                                <div>Language</div>
                            </div>

                            <div>Word</div>
                            <div>
                                description
                            </div>
                            <div>Like:</div>
                            <div></div>
                        </div>

                        <div class="iconBx">
                            <ion-icon name="eye-outline"></ion-icon>
                        </div>
    </div>*/}



                </div>


            </div>
        </div>
    );
}

export default AdminPanel;