import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "../App.css";
import homepagebackground from "../assets/homepagebackground.svg";

function HomePage() {
    const [displayName, setDisplayName] = useState("User");
    const [time, setTime] = useState(getTimeOfDay());
    const [timeOfDay, setTimeOfDay] = useState("Good evening");

    let accessToken = window.localStorage.getItem("token");

    if (accessToken === null) {
        window.location.href = "/login";
    }

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
            timeOfDay = 'evening';
        }
        return [timeOfDay, currentHour];
    }

    return(
        <div>
            <img src={homepagebackground} alt="background wave" className="fixed inset-0 w-full h-full object-cover z-0"
                 style={{"zIndex": -1}}/>
            <div className="mt-40 mb-24 text-center text-7xl font-outfit text-ourPurple font-bold">
                Good {time[0]}, <span className="text-orange-600">{displayName}</span>.
            </div>
            <div className="my-6 text-center">
                <Link to="/session-start">
                    <button className="px-8 py-6 text-center rounded-3xl text-xl font-sora text-white hover:bg-purple-950 bg-ourPurple">
                        <div className="flex flex-row">
                            <div className="w-52 p-2 whitespace-nowrap">
                                Start session
                            </div>
                        </div>
                    </button>
                </Link>
            </div>

            <div className="my-6 text-center">
                <Link to="/training">
                    <button className="px-8 py-6 text-center rounded-3xl text-xl font-sora text-white hover:bg-purple-950 bg-ourPurple">
                        <div className="flex flex-row">
                            <div className="w-52 p-2 whitespace-nowrap">
                                Teach us about you
                            </div>
                        </div>
                    </button>
                </Link>
            </div>

            <div className="my-6 text-center">
                <Link to="/about">
                    <button className="px-8 py-6 text-center rounded-3xl text-xl font-sora text-white hover:bg-purple-950 bg-ourPurple">
                        <div className="flex flex-row">
                            <div className="w-52 p-2 whitespace-nowrap">
                                About
                            </div>
                        </div>
                    </button>
                </Link>
            </div>

        </div>
    );
}

export default HomePage;