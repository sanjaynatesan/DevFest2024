import {useEffect, useState} from "react";
import "../App.css";

function HomePage() {

    return(
        <div>
            <div className="mt-40 mb-24 text-center text-3xl sm:text-4xl font-mono">
                Good evening, Erick.
            </div>
            <div className="my-4 text-center">
                <button className="px-4 py-3 text-center border-black border-4 font-mono rounded-3xl text-black hover:bg-gray-50">
                    <div className="flex flex-row">
                        <div className="w-44 p-2 text-sm sm:text-lg whitespace-nowrap">
                            Start session
                        </div>
                    </div>
                </button>
            </div>
            <div className="my-4 text-center">
                <button className="px-4 py-3 text-center border-black border-4 font-mono rounded-3xl text-black hover:bg-gray-50">
                    <div className="flex flex-row">
                        <div className="w-44 p-2 text-sm sm:text-lg whitespace-nowrap">
                            Your stats
                        </div>
                    </div>
                </button>
            </div>
            <div className="my-4 text-center">
                <button className="px-4 py-3 text-center border-black border-4 font-mono rounded-3xl text-black hover:bg-gray-50">
                    <div className="flex flex-row">
                        <div className="w-44 p-2 text-sm sm:text-lg whitespace-nowrap">
                            Settings
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
}

export default HomePage;