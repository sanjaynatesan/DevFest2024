import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import sessionprepagebackground from "../assets/sessionprepagebackground.svg";

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
        `${mindset === buttonMindset ? 'bg-ourPurple text-white' : 'hover:bg-ourPurple hover:text-white'}`;

    return (
        <div>
            <img src={sessionprepagebackground} alt="background wave" className="fixed inset-0 w-full h-full object-cover z-0"
                 style={{"zIndex": -1}}/>
            <div className="mt-20 mb-16 text-center text-7xl font-outfit text-ourPurple font-bold">
                How are you feeling today?
            </div>
            <div className="mt-6 mx-72 grid grid-cols-2 gap-4 font-sora font-bold text-lg">
                {['Jaded', 'Happy', 'Excited', 'Wistful', 'Faithful', 'Salacious'].map((emotion) => (
                    <div key={emotion} className={`rounded-3xl text-center align-middle py-4 hover:cursor-pointer bg-white ${buttonClass(emotion)} onClick={() => handleMindsetChange(emotion)}`}>
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
            <div className="w-full my-12 flex justify-center items-center p-4 font-outfit font-bold">
                <div className="flex items-center space-x-4">
                    <p className="text-ourPurple text-4xl mb-2">Or tell us in words:</p>
                        <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onClick={() => setMindset('')}
                        className="bg-white w-96 p-3 rounded-3xl hover:cursor-pointer font-bold text-xl text-gray-800 placeholder-gray-300"
                        placeholder="Enter something..."
                        />
                    <div>
                        <button onClick={handleSubmit} 
                                className="p-3 hover:cursor-pointer hover:bg-purple-950 bg-ourPurple text-white text-lg">
                            Next
                        </button>
                    </div>
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
        </div>
    );
}

export default SessionPrePage;
