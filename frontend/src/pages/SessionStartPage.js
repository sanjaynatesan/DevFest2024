import {useEffect, useState} from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import "../App.css";
function SessionStartPage() {

    const [time, setTime] = useState(getTimeOfDay());
    const [timeOfDay, setTimeOfDay] = useState("Good evening");

    const [displayName, setDisplayName] = useState("User");

    useEffect(() => {
        // Retrieve display_name from local storage
        const storedDisplayName = window.localStorage.getItem("display_name");
        setDisplayName(storedDisplayName || "Guest"); // Set default to "Guest" if not found
    }, []);

    useEffect(() => {
        setTime(getTimeOfDay());
        setTimeOfDay(`Good ${time[0]}`);

    }, []);



    function getTimeOfDay() {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();

        let timeOfDay;

        if (currentHour >= 5 && currentHour < 12) {
            timeOfDay = 'morning';
        } else if (currentHour >= 12 && currentHour < 17) {
            timeOfDay = 'afternoon';
        } else {
            timeOfDay = 'night';
        }

        return [timeOfDay, currentHour];
    }


    return(
        <div>
            <div className="mt-40 mb-24 text-center text-3xl sm:text-4xl font-mono">
                <div>Good {time[0]}, {displayName}.</div>
                <div>We're so glad you're here.</div>
            </div>
            <div className="my-4 text-center">
                <Link to="/session-pre">
                    <button className="px-4 py-3 text-center border-black border-4 font-mono rounded-3xl text-black hover:bg-gray-50">
                        <div className="flex flex-row">
                            <div className="w-44 p-2 text-sm sm:text-lg whitespace-nowrap">
                                Find New Music
                            </div>
                        </div>
                    </button>   
                </Link>
                
            </div>
            <div className="my-4 text-center">
                <Link to="/talk-to-us">
                    <button className="px-4 py-3 text-center border-black border-4 font-mono rounded-3xl text-black hover:bg-gray-50">
                        <div className="flex flex-row">
                            <div className="w-44 p-2 text-sm sm:text-lg whitespace-nowrap">
                                Talk to Us
                            </div>
                        </div>
                    </button>   
                </Link>
            </div>
        </div>
    );
}

export default SessionStartPage;