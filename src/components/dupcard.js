import React, { useContext, useState } from "react";
import { ShareButton } from "react-custom-share";

import '../assets/css/card.css';
import { ReactComponent as Like } from '../assets/icons/hand-thumbs-up-fill.svg';
import { ReactComponent as DisLike } from '../assets/icons/hand-thumbs-down-fill.svg';
import { ReactComponent as Facebook } from '../assets/icons/facebook.svg';
import { ReactComponent as Twitter } from '../assets/icons/twitter.svg';
import { ReactComponent as Speaker } from '../assets/icons/volume-up-fill.svg';
import { ReactComponent as FlagIcon } from '../assets/icons/flag-fill.svg';
import { ReactComponent as Share } from '../assets/icons/share.svg';


import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { UserContext } from './loginContext';
import { upvote } from "../services/upvote"
import { undoupvote } from '../services/undoupvote'
import { downvote } from "../services/downvote"
import { undodownvote } from '../services/undodownvote'

import {flag} from '../services/flag';
import { undoFlag } from "../services/undoFlag";

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

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
const fbButtonProps = {
    network: "Facebook",
    url: window.location.href,

};
const twitterButtonProps = {
    network: "Twitter",
    url: window.location.href,

};

function CardContent(props) {
    const [black, setBlack] = useState('')


    let subtitle, background, like, dislike,flagicon;
    const user = useContext(UserContext);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [fillColor, setFill] = useState('white')


    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#F9E007';
        background.style.backgroundColor = "transparent"

    }

    function closeModal() {
        setIsOpen(false);
    }

    function handleLike(e) {
        var params = {
            wordid: props.id,
            token: localStorage.getItem('token'),
            userid: localStorage.getItem('userid')
        }
        const color = like.style.fill;

        if (color == 'white') {

            like.style.fill = 'black'
            upvote(params)

        }
        else {
            like.style.fill = 'white'
            undoupvote(params)
        }


    }

    function handleDislike(e) {
        var params = {
            wordid: props.id,
            token: localStorage.getItem('token'),
            userid: localStorage.getItem('userid')
        }
        e.preventDefault();
        const color = dislike.style.fill;

        if (color == 'white') {

            dislike.style.fill = 'black'
            downvote(params)

        }
        else {
            dislike.style.fill = 'white'
            undodownvote(params)
        }
 }

 function setFlag(e) {
  
    var params = {
        wordid: props.id,
        token: localStorage.getItem('token'),
        userid: localStorage.getItem('userid')
    }
    e.preventDefault();
    const color = flagicon.style.fill;
console.log(flagicon)
    if (color == 'white') {

        flagicon.style.fill = 'black'
        flag(params)

    }
    else {
        flagicon.style.fill = 'white'
        undoFlag(params)
    }
}


    return (
        <div className="card-body text-left">


            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>You need to login first !</h2>
                <button ref={(_background) => (background = _background)} onClick={closeModal}>Go to Login</button>
                <div></div>

            </Modal>
            <div className="container">
                <div className="row">

                    <div className="col-sm-6 d-flex p-0">
                        <div>
                            <div className="d-flex">
                                <h5 className="card-title w-100">{props.word != undefined ? props.word : ''}</h5>


                            </div>
                            <h6 className="card-subtitle d-inline-flex mb-2 text-muted">{props.partofspeech != undefined ? props.partofspeech : ''}</h6>
                            <h6 className="card-subtitle d-inline-flex mt-3 ml-2 text-muted">[{props.languages != undefined ? props.languages : ''}]</h6>
                        </div>


                    </div>
                    <div className="col-sm-6 justify-content-end p-0 text-right">
                        <div>
                            <ShareButton style={{ border: 'none', background: 'transparent' }} {...twitterButtonProps} >
                                <Twitter width={30} height={30} viewBox="-5 0 25 15" className=" mr-2 small-icon" />
                            </ShareButton>
                            <ShareButton  {...fbButtonProps}>
                                <Facebook width={30} height={30} viewBox="-5 0 25 15" className="small-icon" />
                            </ShareButton>

                            {/*

    */}
                        </div>
                        <div>
                            <div style={{ paddingTop: "30px", width: "100%", justifyContent: 'end' }} className="d-flex">
                                <Like ref={(_like) => (like = _like)} width={35} height={35} viewBox="-3 0 25 15" fill={'white'} strokeWidth={'1'} stroke={'black'} className=" mr-2 medium-icon" onClick={e => (handleLike(e))} />
                                <div className="likedislike-count text-center m-2" >{props.upvote != undefined ? props.upvote : ''}</div>
                                <DisLike ref={(_dislike) => (dislike = _dislike)} width={35} height={35} fill={'white'} viewBox="-3 0 25 15" className="medium-icon" strokeWidth={'1'} stroke={'black'} onClick={e => (handleDislike(e))} />
                                <div className="likedislike-count text-center m-2" >{props.downvote != undefined ? props.downvote : ''}</div>

                            </div>
                        </div>


                    </div>

                </div>
            </div>





            <hr border-top={1} color={'#666666'} />
            <div className='pb-5'>
                <ol>
                    <li className="card-text">
                        {props.definition != undefined ? props.definition : ''}

                    </li>
                </ol>

            </div>
            <div class=" card-bottom py-2 d-flex justify-content-between">
                <span className='card-subtitle w-50'>Added by {props.userHandle != undefined ? props.userHandle : ''} on {props.postedDate != undefined ? props.postedDate.split(' ')[0] : ''}</span>
                <span className="card-subtitle w-80 text-right"></span>
                <span className="w-40">
                    <FlagIcon ref={(_flag) => (flagicon = _flag)} width={30} height={30} viewBox="-5 0 25 15"strokeWidth={'1'} stroke={'black'}fill={'white'} className="small-icon" onClick={e => (setFlag(e))} />
                </span>
            </div>


        </div>
    );
}

export default class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = { bwEffect: false };
        this.toggleEffect = this.toggleEffect.bind(this);
    }

    toggleEffect() {
        this.setState(prevState => ({
            bwEffect: !prevState.bwEffect
        }));
    }



    render() {
        return (
            <div >
                <div className="card m-3" id={this.props.id}>

                    <CardContent
                        word={this.props.word}
                        languages={this.props.languages}
                        postedDate={this.props.postedDate}
                        partofspeech={this.props.partofspeech}
                        userHandle={this.props.userHandle}
                        definition={this.props.definition}
                        upvote={this.props.upvote}
                        downvote={this.props.downvote}
                        id={this.props.id}

                    />
                </div>
            </div>
        );
    }
}

Card.defaultProps = {
    title: "Template - Card Title",
    location: "Location label",
    description: "Template description textbox"
};
