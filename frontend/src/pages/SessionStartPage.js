import {useEffect, useState} from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import "../App.css";
import talkToUsPage from "./TalkToUsPage";
import sessionstartpagebackground from "../assets/sessionstartpagebackground.svg";
function SessionStartPage() {
    const [displayName, setDisplayName] = useState("User");

    function startSession(){
        window.location.href = "/session-pre";
    }

    function goToTalk(){
        window.location.href = "/talk-to-us";
    }

    useEffect(() => {
        // Retrieve display_name from local storage
        const storedDisplayName = window.localStorage.getItem("display_name");
        setDisplayName(storedDisplayName || "Guest"); // Set default to "Guest" if not found
    }, []);

    return(
        <div>
            <img src={sessionstartpagebackground} alt="background wave" className="fixed inset-0 w-full h-full object-cover z-0"
                 style={{"zIndex": -1}}/>
            <div className="mt-40 mb-24 text-center text-7xl font-outfit text-ourPurple font-bold">
                Hi <span className="text-orange-600">{displayName}</span>.
                Let's get started.
            </div>
            <div className="my-6 text-center">
                <Link to="/session-pre">
                    <button className="px-8 py-6 text-center rounded-3xl text-xl font-sora text-white hover:bg-purple-950 bg-ourPurple"
                    onClick={startSession}>
                        <div className="flex flex-row">
                            <div className="w-52 p-2 whitespace-nowrap">
                                Find New Music
                            </div>
                        </div>
                    </button>   
                </Link>
                
            </div>
            <div className="my-6 text-center">
                <Link to="/talk-to-us">
                    <button className="px-8 py-6 text-center rounded-3xl text-xl font-sora text-white hover:bg-purple-950 bg-ourPurple">
                        <div className="flex flex-row">
                            <div className="w-52 p-2 whitespace-nowrap"
                            onClick={goToTalk}>
                                Talk to Us
                            </div>
                        </div>
                    </button>   
                </Link>
            </div>

            <Link to="/home">
                    <div className="text-center font-sora text-lg fixed top-0 left-0 p-4 ml-8 mt-8">
                        <button className="px-5 py-3 text-center rounded-2xl text-ourPurple bg-white hover:bg-gray-200">
                            <div className="flex flex-row">
                            ← Home
                            </div>
                        </button>
                    </div>
                </Link>
        </div>
    );
}

export default SessionStartPage;