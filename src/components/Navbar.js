import React, { useContext, useState } from 'react';
import '../assets/css/navbar.css';
import { useNavigate } from "react-router-dom";
import { ReactComponent as Add } from '../assets/icons/plus-circle.svg';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserContext } from './loginContext';


const theme = createTheme({
    palette: {
        primary: {
            main: "#ffffff",
        }
    },
});

export default function Navbar({ childToParent }) {
    let navigate = useNavigate();
    const user = useContext(UserContext);

    const [searchInput, setSearchInput] = useState('');
    function handleClick() {
        navigate("/login");
    }



    //handle search functionality

    return (
        <ThemeProvider theme={theme}>

            <div >
                <div className='row '>
                    <div className='col-lg-3'>

                    </div>
                    <div className='col-lg-6  pt-3'>
                        <nav className="navbar navbar-expand-lg  text-center pl-0">
                            <div className='d-flex justify-content-between w-100'>


                                {
                                    user[0] ?


                                        <div className='d-flex justify-content-between w-100'>
                                            <div className='text-left '>
                                                <h3 className='header-text text-capitalize'><a class='header-text text-capitalize btn btn-link' href='http://desidict.com '>Desi Dictionary</a></h3>

                                            </div>
                                            <div>
                                                <button className='bg-transparent border-0'style={{marginRight:10}}onClick={() => navigate('/admin')} >Admin</button>

                                                <img class="rounded-circle" alt="100x100" src={user[0].profileObj.imageUrl != undefined ? user[0].profileObj.imageUrl : ''}
                                                    data-holder-rendered="true" />
                                            </div>


                                        </div>

                                        :
                                        <div className='d-flex justify-content-between w-100'>

                                            <h3 className='header-text text-capitalize'><a class='header-text text-capitalize btn btn-link' href='http://desidict.com '>Desi Dictionary</a></h3>

                                            <button className='bg-transparent border-0' onClick={() => navigate('/admin-login')} >Admin</button>

                                            <button className='bg-transparent border-0' onClick={handleClick} >Login</button>
                                        </div>


                                }

                            </div>






                        </nav>
                    </div>
                    <div className='col-lg-3'>

                    </div>
                    <div className="w-100"></div>
                    <div className='col-lg-3'>

                    </div>
                    <div className='col-lg-6  p-2 text-center d-flex'>

                        <form className="form-inline my-2 my-lg-0 w-100">
                            <span className="fa fa-search form-control-feedback search-icon"></span>
                            <input className="form-control mr-sm-2  w-100 " style={{ paddingLeft: "35px" }} type="search" placeholder="Search" aria-label="Search" onChange={(e) => childToParent(e.target.value)} />
                        </form>

                        <div id="content-desktop" className='justify-content-end p-2 text-right'>
                        <Fab size="medium" onClick={() => { navigate('/addword') }} color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>


                    </div>

                    </div>
                    
                    <div className='col-lg-3'>

                    </div>


                </div>

            </div>
        </ThemeProvider >

    );
}

