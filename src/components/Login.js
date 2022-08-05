import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import GoogleButton from 'react-google-button'
import '../assets/css/login.css'
import { ReactComponent as Back } from '../assets/icons/arrow-left-circle.svg';
import { useGoogleLogin } from 'react-google-login'
import { UserContext } from './loginContext';
import { refreshTokenSetup } from '../refreshToken';
import { gapi } from 'gapi-script';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;


function Login(props) {
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);
    useEffect(() => {
        function start() {
          gapi.client.init({
            clientId: clientId,
            scope: 'email',
          });   
        }
    
        gapi.load('client:auth2', start);
      }, [])   
    const onSuccess = async (res) => {



        localStorage.setItem('user',JSON.stringify(res))
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
                    email_verified: "True",
                    userType:'3'
                }),



            });
            const data = await response.json();
            const token = data.Data.token;
            const userid = data.Data.userid;

            localStorage.setItem('token', token);
            localStorage.setItem('userid',userid)
            navigate("/")


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

    return (
        <div className="container-fluid">

            <div className='row h-100 row-bg py-5'>

                <div className='col-lg-4'>


                </div>
                <div className='col-lg-4'>
                    <Back onClick={() => navigate(-1)} width={35} height={35} viewBox="0 0 20 20" className='d-block' />

                    <div className=" bg-image" >
                    </div>
                    <div className='text-center pt-5 pb-5 font-weight-bold'>
                    </div>
                </div>
                <div className='col-lg-4'>


                </div>
                <div className='w-100'></div>
                <div className='col-lg-4'>

                </div>
                <div className='col-lg-4 '>
                    <div className='py-2 px-5 login-button  d-inline-flex google-text' onClick={signIn}>
                        <span className='mx-3' id="google"></span>Log in with Google
                    </div>

                   
                   { /*<div id="content-mobile" className='mt-3 py-2 login-button  px-5 apple-text'>
                        <span className='mx-3' id="apple"></span>Log in with Apple
                    </div>*/}
                </div>
                <div className='col-lg-4'>

                </div>


            </div>

        </div>
    );
}

export default Login;