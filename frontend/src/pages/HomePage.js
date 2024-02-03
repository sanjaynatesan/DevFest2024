import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "../App.css";

function HomePage() {
    const [displayName, setDisplayName] = useState("User");

    useEffect(() => {
        // Retrieve display_name from local storage
        const storedDisplayName = window.localStorage.getItem("display_name");
        setDisplayName(storedDisplayName || "Guest"); // Set default to "Guest" if not found
    }, []);


    return(
        <div>
            <div className="mt-40 mb-24 text-center text-3xl sm:text-4xl font-mono">
                Good evening, {displayName}.
            </div>

            <div className="my-4 text-center">
                <Link to="/session-start">
                    <button className="px-4 py-3 text-center border-black border-4 font-mono rounded-3xl text-black hover:bg-gray-50">
                        <div className="flex flex-row">
                            <div className="w-52 p-2 text-sm sm:text-lg whitespace-nowrap">
                                Start session
                            </div>
                        </div>
                    </button>
                </Link>
            </div>

            <div className="my-4 text-center">
                <Link to="/training">
                    <button className="px-4 py-3 text-center border-black border-4 font-mono rounded-3xl text-black hover:bg-gray-50">
                        <div className="flex flex-row">
                            <div className="w-52 p-2 text-sm sm:text-lg whitespace-nowrap">
                                Teach us about you
                            </div>
                        </div>
                    </button>
                </Link>
            </div>

            <div className="my-4 text-center">
                <button className="px-4 py-3 text-center border-black border-4 font-mono rounded-3xl text-black hover:bg-gray-50">
                    <div className="flex flex-row">
                        <div className="w-52 p-2 text-sm sm:text-lg whitespace-nowrap">
                            Settings
                        </div>
                    </div>
                </button>
            </div>

        </div>
    );
}

export default HomePage;