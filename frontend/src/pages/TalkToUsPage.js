import React, {useEffect, useState} from "react";
import "../App.css";
import axios from "axios";

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
            <div className="mt-12 mx-60 text-center text-xl sm:text-2xl font-mono">
                We're here to listen. What's on your mind?
            </div>
            <div>
                <div className="mt-12 mx-60 text-center text-xl sm:text-2xl font-mono">
                    <input type="text"
                           value={inputValue}
                           onChange={handleInputChange}
                           placeholder="Enter something..."
                           className="border-black border-2 pb-36 pr-56 hover:cursor-pointer text-start"
                    ></input>
                </div>
            </div>
            <div>
                <div className="my-4 text-center">
                    <button className="px-4 py-3 text-center border-black border-2 font-mono rounded-3xl text-black hover:bg-gray-50"
                            onClick={handleSubmit}>
                        <div className="flex flex-row">
                            <div className="w-15 p-2 text-sm sm:text-lg whitespace-nowrap">
                                Submit
                            </div>
                        </div>
                    </button>
                </div>
            </div>
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