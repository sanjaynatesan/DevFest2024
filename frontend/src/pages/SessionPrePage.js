import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

// Ensure you import your CSS file here if it's not already done
import "../App.css";
import { Link } from "react-router-dom";

function SessionPrePage() {
    const [mindset, setMindset] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [inputType, setInputType] = useState(0);
    const [isClicked, setIsClicked] = useState(false);
    const [response, setResponse] = useState('');
    const navigate = useNavigate();


    async function handleSubmit () {
        try{
            if('' === mindset && '' === inputValue) {
                return;
            }
            setIsSubmitted(true);

            setMindset(mindset.toLowerCase());
            setInputValue(inputValue.toLowerCase());

            // 0 is button, 1 is input

            const response = await fetch('/presessionResultProcessing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: window.localStorage.getItem("username"),
                    inputType: inputType,
                    feelings: mindset.toLowerCase(),
                    written_feelings: inputValue,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            navigate('/session', { state: { message: data } });
        }catch (error) {
            console.error('Error submitting feelings:', error);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setInputType(1);
        if(e.target.value !== '') {
            setIsClicked(true);
        }else{
            setIsClicked(false);
        }
        // Reset selected mindset when the input box is used
        setMindset('');
        setIsSubmitted(false);

    };

    const handleMindsetChange = (selectedMindset) => {
        if(mindset === selectedMindset) {
            setIsClicked(false);
            setMindset('');
            return;
        }
        setMindset(selectedMindset);
        setInputType(0);

        setIsClicked(true);
        // Clear input box when a mindset is selected
        setInputValue('');
        setIsSubmitted(false);
    };

    // Define a function to determine the button's class based on the selected mindset
    const buttonClass = (buttonMindset) =>
        `border-black border-2 p-4 hover:cursor-pointer ${mindset === buttonMindset ? 'bg-black text-white' : 'hover:bg-black hover:text-white'}`;

    return (
        <div>
            <div className="mt-12 mx-60 text-center text-xl sm:text-2xl font-mono">
                How are you feeling today?
            </div>
            <div className="mt-12 mx-72 grid grid-cols-2 gap-4 font-mono">
                {['Jaded', 'Happy', 'Excited', 'Wistful', 'Faithful', 'Salacious'].map((emotion) => (
                    <div key={emotion} className={buttonClass(emotion)} onClick={() => handleMindsetChange(emotion)}>
                        {emotion}
                    </div>
                ))}
            </div>
            {/*<div className="my-4 text-center">*/}
            {/*    <button className="px-3 py-1 text-center border-black border-2 font-mono rounded-3xl text-black hover:bg-black hover:text-white">*/}
            {/*        <div className="flex flex-row">*/}
            {/*            <div className="w-15 p-2 text-sm sm:text-lg whitespace-nowrap">*/}
            {/*                More*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </button>*/}
            {/*</div>*/}
            <div>
                <div className="mt-12 mx-60 text-center text-xl sm:text-2xl font-mono">
                    <span className={"mr-4"}>Or, talk to us:</span>
                    <input type="text"
                           value={inputValue}
                           onChange={handleInputChange}
                           onClick={() => setMindset('')}
                           placeholder="Enter something..."
                           className="border-black border-2 p-4 hover:cursor-pointer"
                    ></input>
                </div>
            </div>
            <div>
                <div className="my-4 text-center">
                    {isClicked ? (
                        <button className="px-4 py-3 text-center border-black border-2 font-mono rounded-3xl text-black hover:bg-black hover:text-white"
                                onClick={handleSubmit}>
                            <div className="flex flex-row">
                                {/*<Link to="/session">*/}
                                    <div className="w-15 p-2 text-sm sm:text-lg whitespace-nowrap">
                                        Submit
                                    </div>
                                {/*</Link>*/}
                            </div>
                        </button>
                    ) : (
                        <div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default SessionPrePage;
