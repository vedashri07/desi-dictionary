import React from 'react';
import { useNavigate } from "react-router-dom";

function Footer(props) {

    let navigate = useNavigate();

    return (
        <div>
            <section class="">
                <footer class=" text-white text-center border-top">
                    

                    <div class="text-center p-3 text-muted" >
                        
                        <a class="text-white text-muted" onClick={()=>{navigate('/privacy-policy')}}>Privacy Policy</a>
                    </div>
                </footer>
            </section>
        </div>
    );
}

export default Footer;