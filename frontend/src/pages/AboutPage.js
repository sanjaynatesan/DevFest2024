import React from 'react';
import sessionpagebackground from "../assets/sessionpagebackground.svg";
import usImage from "../assets/us.jpg";
import {Fade} from "@chakra-ui/react"; // Import the image
import aboutpagebackground from "../assets/aboutpagebackground.svg";    
import {Link} from "react-router-dom";

function AboutPage() {
    return (
        <div style={{
            height: '200vh', // Set the height to be twice the viewport height
            backgroundImage: `url(${aboutpagebackground})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            zIndex: -1,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        }}>
                <Fade in={true} transition={{enter: {duration: 1}}}>
                    <div className="mt-20 text-center font-outfit text-5xl font-bold mb-12 text-white">
                        The Team
                    </div>
                    <img src={usImage} alt="us" className="mx-auto w-1/3 h-1/4 rounded-md"/>
                    <div className="mt-12 mx-64 text-center font-sora text-xl font-bold mb-12 text-white">
                        <span>H</span>ey! Aaron, Erick, Sanjay, and Kent here. We're students at Columbia looking to change
                        the way that people interact with music. As musicians ourselves, we are interested in
                        how music contributes to our own wellness and so we figured: why not use tech to help others work towards 
                        wellness through music? That was the motivation behind Polyphony (Greek for "many sounds")
                        a web app that helps you get in touch with your different feelings through different songs. We've put a lot of work into the project
                        and we're excited to share it with you all. We hope you enjoy Polyphony!
                    </div>
                </Fade>

                <Link to="/Login">
                    <div className="text-center font-sora text-lg fixed top-0 left-0 p-4 ml-8 mt-8">
                        <button className="px-5 py-3 text-center rounded-2xl text-ourPurple bg-white hover:bg-gray-200">
                            <div className="flex flex-row">
                            ← Login
                            </div>
                        </button>
                    </div>
                </Link>
        </div>
    );
}

export default AboutPage;
