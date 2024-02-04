import React from 'react';
import sessionpagebackground from "../assets/sessionpagebackground.svg";
import usImage from "../assets/us.jpg";
import {Fade} from "@chakra-ui/react"; // Import the image

function AboutPage() {
    return (
        <div style={{
            height: '200vh', // Set the height to be twice the viewport height
            backgroundImage: `url(${sessionpagebackground})`,
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
            <div>
                <Fade in={true} transition={{enter: {duration: 1}}}>
                    <img src={usImage} alt="us" className="mx-auto mt-4 w-1/2 h-1/3 rounded-md"/>
                    <div className="mt-20 text-center text-3xl sm:text-2xl font-bold mb-20 text-black">
                        About Us
                    </div>
                </Fade>
            </div>
        </div>
    );
}

export default AboutPage;
