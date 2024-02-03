import React, {useEffect, useState} from "react";
import "../App.css";
import axios from "axios";

function SessionPrePage() {
    const [mindset, setMindset] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = () => {
        if (mindset === '' && inputValue === '') {
            return;
        }
        setIsSubmitted(true);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleMindsetChange = (mindset) => {
        setMindset(mindset);
    }


    return(
        <div>
            <div className="mt-12 mx-60 text-center text-xl sm:text-2xl font-mono">
                How are you feeling today?
            </div>
            <div className="mt-12 mx-72 grid grid-cols-2 gap-4 font-mono">
                <div className="border-black border-2 p-4 hover:cursor-pointer"
                    onClick={() => handleMindsetChange('Jaded')}>Jaded</div>
                <div className="border-black border-2 p-4 hover:cursor-pointer"
                     onClick={() => handleMindsetChange('Happy')}
                >Happy</div>
                <div className="border-black border-2 p-4 hover:cursor-pointer">Excited</div>
                <div className="border-black border-2 p-4 hover:cursor-pointer">Wistful</div>
                <div className="border-black border-2 p-4 hover:cursor-pointer">Faithful</div>
                <div className="border-black border-2 p-4 hover:cursor-pointer">Salacious</div>
            </div>
            <div className="my-4 text-center">
                <button className="px-3 py-1 text-center border-black border-2 font-mono rounded-3xl text-black hover:bg-gray-50">
                    <div className="flex flex-row">
                        <div className="w-15 p-2 text-sm sm:text-lg whitespace-nowrap">
                            More
                        </div>
                    </div>
                </button>
            </div>
            <div>
                <div className="mt-12 mx-60 text-center text-xl sm:text-2xl font-mono">
                   <span className={"mr-4"}>Or, talk to us:</span>
                    <input type="text"
                           value={inputValue}
                           onChange={handleInputChange}
                           placeholder="Enter something..."
                            className="border-black border-2 p-4 hover:cursor-pointer"
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

                <div>
                    {mindset}
                </div>
            </div>


            }
        </div>
    );
}

export default SessionPrePage;