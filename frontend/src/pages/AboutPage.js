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
                    <img src={usImage} alt="us" className="mx-auto mt-4 w-1/2 h-1/3 rounded-md"/>
                    <div className="mt-20 text-center text-8xl sm:text-2xl font-bold mb-20 text-white">
                        About Us
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
