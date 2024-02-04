import React, {useEffect, useState} from "react";
import "../App.css";
import trainingpagebackground from "../assets/trainingpagebackground.svg"

function TrainingPage() {
    const [recentSongs, setRecentSongs] = useState(null);
    const [recentSongsLoaded, setRecentSongsLoaded] = useState(false);
    const [selectedFeelings, setSelectedFeelings] = useState([]);
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [writtenFeelings, setWrittenFeelings] = useState('');
    const [displayName, setDisplayName] = useState("User");

    const feelings = ["jaded", "happy", "stressed", "wistful", "faithful", "salacious"];

    useEffect(() => {
        // Retrieve display_name from local storage
        const storedDisplayName = window.localStorage.getItem("display_name");
        setDisplayName(storedDisplayName || "Guest"); // Set default to "Guest" if not found
    }, []);



    useEffect( () => {
        async function fetchData() {
            try {
                const response = await fetch('/recent');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRecentSongs(data);
                setRecentSongsLoaded(true);
                console.log(data);
            } catch (error) {
                console.error('Error fetching recent data:', error);
            }
        };
        fetchData();
    }, [])

    function handleFeelingClick(feeling) {
        console.log("Just clicked: ", feeling);
        // Toggle the selected feeling
        setSelectedFeelings((prevSelectedFeelings) => {
            if (prevSelectedFeelings.includes(feeling)) {
                return prevSelectedFeelings.filter((selectedFeeling) => selectedFeeling !== feeling);
            } else {
                return [...prevSelectedFeelings, feeling];
            }
        });
        console.log("selected feelings are: ", selectedFeelings);
    }

    const handleWrittenFeelingsChange = (e) => {
        setWrittenFeelings(e.target.value);
    }

    async function handleSubmit() {
        // First, convert all feelings to lowercase
        let feelings1 = [...selectedFeelings]; 
        let feelings2 = writtenFeelings;
        for (let i = 0; i < feelings1.length; i++) {
            if (typeof feelings1[i] === 'string') {
              feelings1[i] = feelings1[i].toLowerCase();
            }
        }
        feelings2 = feelings2.toLowerCase();

        try {
            const response = await fetch('/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    username: window.localStorage.getItem("username"),
                    feelings: feelings1,
                    written_feelings: feelings2,
                    not_feelings: Array.from(feelings).filter((x) => !feelings1.includes(x)),
                    song_uri: recentSongs[currentSongIndex].uri
                 }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setSubmissionStatus(data.message); // Extract the 'message' property

            // Reset text in input field 
            setWrittenFeelings('');

            // Move on to session page after clicking next on last song
            if (currentSongIndex === recentSongs.length - 1) {
                window.location.href = "/session-pre";
                return;
            }

            // Move to the next song
            setCurrentSongIndex((prevIndex) => (prevIndex + 1) % recentSongs.length);
            setSelectedFeelings([]);
        } catch (error) {
            console.error('Error submitting feelings:', error);
        }
    }

    return(
        <div>
            <img src={trainingpagebackground} alt="background wave" className="fixed inset-0 w-full h-full object-cover z-0"
                 style={{"zIndex": -1}}/>
            <div className="mt-10 mx-48 text-center text-3xl sm:text-4xl font-outfit text-ourPurple font-bold">Hey,
                <span className="text-orange-600"> {displayName}</span>!&nbsp;
                Here is a song you played recently:
            </div>
            <div>
                <img className="className mx-auto mt-9 w-44 h-44 rounded-md"
                    src={recentSongsLoaded && recentSongs ? recentSongs[currentSongIndex].image : "#"} // Replace 'image' with the actual property name in your API response
                    alt="Song Cover"
                />     
                <div
                    className="mt-4 mx-60 text-center text-xl sm:text-2xl font-outfit text-blue-800 font-normal">{recentSongsLoaded && recentSongs ? recentSongs[currentSongIndex].title : "Song Title"}</div>
                <div
                    className="mx-60 text-center text-xl sm:text-2xl font-outfit text-blue-800 font-normal">{recentSongsLoaded && recentSongs ? recentSongs[currentSongIndex].artist : "Artist"}</div>
                {recentSongsLoaded && recentSongs && recentSongs[currentSongIndex].title !== recentSongs[currentSongIndex].album && (
                    <div className="mt-1 mx-60 text-center text-xl sm:text-2xl font-outfit text-blue-800 font-normal">
                        {recentSongs[currentSongIndex].album}
                    </div>
                )}
            </div>
            <div className="mt-3 mx-48 text-center text-3xl sm:text-4xl font-outfit text-ourPurple font-bold">
                How do you feel when listening to this song?
            </div>

            <div className="mt-10 mx-64 grid grid-cols-2 gap-4 font-sora text-xl text-gray-800 font-bold">
                <div
                    className={`rounded-3xl text-center align-middle py-4 hover:cursor-pointer hover:bg-gray-100 ${selectedFeelings.includes("Jaded") ? "bg-purple-200" : "bg-white"}`}
                    onClick={() => handleFeelingClick("Jaded")}
                >
                    Jaded
                </div>
                <div
                    className={`rounded-3xl text-center align-middle py-4 hover:cursor-pointer hover:bg-gray-100 ${selectedFeelings.includes("Happy") ? "bg-purple-200" : "bg-white"}`}
                    onClick={() => handleFeelingClick("Happy")}
                >
                    Happy
                </div>
                <div
                    className={`rounded-3xl text-center align-middle py-4 hover:cursor-pointer hover:bg-gray-100 ${selectedFeelings.includes("Stressed") ? "bg-purple-200" : "bg-white"}`}
                    onClick={() => handleFeelingClick("Stressed")}
                >
                    Stressed
                </div>
                <div
                    className={`rounded-3xl text-center align-middle py-4 hover:cursor-pointer hover:bg-gray-100 ${selectedFeelings.includes("Wistful") ? "bg-purple-200" : "bg-white"}`}
                    onClick={() => handleFeelingClick("Wistful")}
                >
                    Wistful
                </div>
                <div
                    className={`rounded-3xl text-center align-middle py-4 hover:cursor-pointer hover:bg-gray-100 ${selectedFeelings.includes("Faithful") ? "bg-purple-200" : "bg-white"}`}
                    onClick={() => handleFeelingClick("Faithful")}
                >
                    Faithful
                </div>
                <div
                    className={`rounded-3xl text-center align-middle py-4 hover:cursor-pointer hover:bg-gray-100 ${selectedFeelings.includes("Salacious") ? "bg-purple-200" : "bg-white"}`}
                    onClick={() => handleFeelingClick("Salacious")}
                >
                    Salacious
                </div>
            </div>

            <div className="w-full my-6 flex justify-center items-center p-4 font-outfit font-bold">
                <div className="flex items-center space-x-4">
                    <p className="text-ourPurple text-4xl mb-2">Or tell us in words:</p>
                        <input
                        value={writtenFeelings}
                        onChange={handleWrittenFeelingsChange}
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
            
            {submissionStatus && (
                <div className="mt-6 mx-72 text-center text-xl text-green-400 font-mono">{submissionStatus}</div>
            )}
        </div>
    );
}

export default TrainingPage;