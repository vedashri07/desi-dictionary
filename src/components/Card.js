import React, { useState, useEffect } from 'react';

import '../assets/css/card.css';
import { ReactComponent as Like } from '../assets/icons/hand-thumbs-up.svg';
import { ReactComponent as DisLike } from '../assets/icons/hand-thumbs-down.svg';
import { ReactComponent as Facebook } from '../assets/icons/facebook.svg';
import { ReactComponent as Twitter } from '../assets/icons/twitter.svg';
import { ReactComponent as Speaker } from '../assets/icons/volume-up-fill.svg';
import { ReactComponent as Flag } from '../assets/icons/flag.svg';


import { useNavigate } from "react-router-dom";


import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getList } from '../services/list';
import DupCard from './dupcard'
import { FilterList } from '@mui/icons-material';

const theme = createTheme({
    palette: {
        primary: {
            main: "#ffffff",
        }
    },
});
function Card({ list, filterKey }) {


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

    console.log(typeof(list))

    let navigate = useNavigate();

    return (

        <ThemeProvider theme={theme}>

            <div className='row p-2 pt-5'>
                <div className='col-lg-3'>
                    {/*<div class="card h-30 ">
                        <div className="text-center px-3 py-2">

                            <div class="wrapper">
                                <ul className='rolling-ul'>
                                    <li>Add</li>
                                    <li>New</li>
                                    <li>Words</li>
                                </ul>
                            </div>

                            <div>
                                <button onClick={() => { navigate('/addword') }} className='rounded-pill addword-btn' >Add Word</button>
                            </div>
                        </div>

    </div>*/}
                </div>
                <div className='col-lg-6'>
                    {
                        <div>
                            {
                                filterKey == '' ?
                                    list.map(item => (
                                        <DupCard
                                            id={item._id}
                                            word={item.word}
                                            languages={item.languages}
                                            postedDate={item.postedDate}
                                            partofspeech={item.partofspeech}
                                            userHandle={item.userHandle}
                                            definition={item.definition}
                                            upvote={item.upvote}
                                            downvote={item.downvote}
                                            className="card"

                                        />
                                    ))
                                    : ''
                            }


                        </div>

                    }

                    {<div>
                        {

                            filterKey ?





                                list.filter(item =>
                                    item.word.includes(filterKey.toLowerCase())) ?
                                    list.filter(item => item.word.includes(filterKey.toLowerCase()).map(item => (
                                        <DupCard
                                            id={item._id}
                                            word={item.word}
                                            languages={item.languages}
                                            postedDate={item.postedDate}
                                            partofspeech={item.partofspeech}
                                            userHandle={item.userHandle}
                                            definition={item.definition}
                                            upvote={item.upvote}
                                            downvote={item.downvote}
                                            className="card"

                                        />
                                    ))
                                    )
                                    : <div>

                                        ‘Not found: Would you like to add definition?’
                                        <h3 className='header-text text-capitalize'><a class='header-text text-capitalize btn btn-link' onClick={() => { navigate('/addword') }}>Add word</a></h3>

                                    </div>




                                : ''



                            /*<div>

                                ‘Not found: Would you like to add definition?’
                                <h3 className='header-text text-capitalize'><a class='header-text text-capitalize btn btn-link' onClick={() => { navigate('/addword') }}>Add word</a></h3>

                                </div>*/
                        }


                        {



                        }</div>}



                    <div id="content-mobile" className='justify-content-end p-2 text-right'>
                        <Fab onClick={() => { navigate('/addword') }} color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>


                    </div>
                </div>
                <div className='col-lg-3'>

                </div>


            </div>
        </ThemeProvider>
    );
}

export default Card;