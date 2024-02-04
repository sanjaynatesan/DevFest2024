import React, {useEffect, useState} from "react";
import "../App.css";
import axios from "axios";
import {Link} from "react-router-dom";
import talktouspagebackground from "../assets/talktouspagebackground.svg";

function TalkToUsPage() {
    const [mindset, setMindset] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = () => {
        if (inputValue === '') {
            return;
        }
        setIsSubmitted(true);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }



    return(
        <div>
            <img src={talktouspagebackground} alt="background wave" className="fixed inset-0 w-full h-full object-cover z-0"
                 style={{"zIndex": -1}}/>
            <div className="mt-40 mb-24 text-center text-6xl font-outfit text-ourPurple font-bold">
                We're here to listen. What's on your mind?
            </div>
            <div>
                <div className="mt-12 mx-60 text-center text-xl sm:text-2xl font-mono">
                    <input type="text"
                           value={inputValue}
                           onChange={handleInputChange}
                           placeholder="Enter something..."
                           className="bg-white px-96 py-12 rounded-3xl hover:cursor-pointer text-sora font-bold text-xl text-gray-800 placeholder-gray-300"
                    ></input>
                </div>
            </div>
            <div>
                <div className="my-12 text-center font-sora">
                    <button className="text-center"
                            onClick={handleSubmit}>
                        <div className="flex flex-row">
                            <div className="p-3 hover:cursor-pointer hover:bg-purple-950 bg-ourPurple text-white text-lg">
                                Submit
                            </div>
                        </div>
                    </button>
                </div>
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

            {isSubmitted && <div className="mt-12 mx-60 text-center text-xl sm:text-2xl font-mono">
                Thank you for sharing your thoughts with us. You entered:
                <div>
                    {inputValue}
                </div>
            </div>
            }
        </div>
    );
}

export default TalkToUsPage;