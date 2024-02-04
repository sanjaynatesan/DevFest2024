import React, {useEffect, useState} from "react";
import "../App.css";

function TrainingPage() {
    const [recentSongs, setRecentSongs] = useState(null);
    const [recentSongsLoaded, setRecentSongsLoaded] = useState(false);
    const [selectedFeelings, setSelectedFeelings] = useState([]);
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [writtenFeelings, setWrittenFeelings] = useState('');

    const [displayName, setDisplayName] = useState("User");

    useEffect(() => {
        // Retrieve display_name from local storage
        const storedDisplayName = window.localStorage.getItem("display_name");
        setDisplayName(storedDisplayName || "Guest"); // Set default to "Guest" if not found
    }, []);



    useEffect( () => {
        async function fetchData() {
            try {
                const response = await fetch('http://127.0.0.1:5000/recent');
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
        // Toggle the selected feeling
        setSelectedFeelings((prevSelectedFeelings) => {
            if (prevSelectedFeelings.includes(feeling)) {
                return prevSelectedFeelings.filter((selectedFeeling) => selectedFeeling !== feeling);
            } else {
                return [...prevSelectedFeelings, feeling];
            }
        });
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
            const response = await fetch('http://127.0.0.1:5000/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    username: window.localStorage.getItem("username"),
                    feelings: feelings1,
                    written_feelings: feelings2,
                 }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setSubmissionStatus(data.message); // Extract the 'message' property

            // Move to the next song
            setCurrentSongIndex((prevIndex) => (prevIndex + 1) % recentSongs.length);
            setSelectedFeelings([]);
        } catch (error) {
            console.error('Error submitting feelings:', error);
        }
    }

    return(
        <div>
            <div className="mt-20 mx-560 text-center text-xl sm:text-2xl font-mono">Hey,&nbsp;
                <span className="text-green-400"> {displayName}.&nbsp; </span>
                Let's talk about your music. Here is a song you played recently:
            </div>
            <div>
                <img
                    src={recentSongsLoaded && recentSongs ? recentSongs[currentSongIndex].image : "#"} // Replace 'image' with the actual property name in your API response
                    alt="Song Cover"
                    className="mx-auto mt-4 w-32 h-32 rounded-md"
                />
                <div
                    className="mt-12 mx-60 text-center text-xl sm:text-xl font-mono">{recentSongsLoaded && recentSongs ? recentSongs[currentSongIndex].title : "Song Title"}</div>
                <div
                    className="mx-60 text-center text-xl sm:text-xl font-mono">{recentSongsLoaded && recentSongs ? recentSongs[currentSongIndex].artist : "Artist"}</div>
                {recentSongsLoaded && recentSongs && recentSongs[currentSongIndex].title !== recentSongs[currentSongIndex].album && (
                    <div className="mx-60 text-center text-xl sm:text-xl font-mono">
                        {recentSongs[currentSongIndex].album}
                    </div>
                )}
            </div>
            <div className="mt-12 mx-60 text-center text-xl sm:text-2xl font-mono">
                How does this song make you feel?
            </div>

            <div className="mt-12 mx-72 grid grid-cols-2 gap-4 font-mono">
                <div
                    className={`border-black border-2 p-4 hover:cursor-pointer ${selectedFeelings.includes("Jaded") ? "bg-gray-300" : ""}`}
                    onClick={() => handleFeelingClick("Jaded")}
                >
                    Jaded
                </div>
                <div
                    className={`border-black border-2 p-4 hover:cursor-pointer ${selectedFeelings.includes("Happy") ? "bg-gray-300" : ""}`}
                    onClick={() => handleFeelingClick("Happy")}
                >
                    Happy
                </div>
                <div
                    className={`border-black border-2 p-4 hover:cursor-pointer ${selectedFeelings.includes("Excited") ? "bg-gray-300" : ""}`}
                    onClick={() => handleFeelingClick("Excited")}
                >
                    Excited
                </div>
                <div
                    className={`border-black border-2 p-4 hover:cursor-pointer ${selectedFeelings.includes("Wistful") ? "bg-gray-300" : ""}`}
                    onClick={() => handleFeelingClick("Wistful")}
                >
                    Wistful
                </div>
                <div
                    className={`border-black border-2 p-4 hover:cursor-pointer ${selectedFeelings.includes("Faithful") ? "bg-gray-300" : ""}`}
                    onClick={() => handleFeelingClick("Faithful")}
                >
                    Faithful
                </div>
                <div
                    className={`border-black border-2 p-4 hover:cursor-pointer ${selectedFeelings.includes("Salacious") ? "bg-gray-300" : ""}`}
                    onClick={() => handleFeelingClick("Salacious")}
                >
                    Salacious
                </div>
            </div>
            <div>
                <div className="mt-12 mx-60 text-center text-xl sm:text-2xl font-mono">
                    <span className={"mr-4"}>Or, talk to us:</span>
                    <input type="text"
                           value={writtenFeelings}
                           onChange={handleWrittenFeelingsChange}
                           placeholder="Enter something..."
                           className="border-black border-2 p-4 hover:cursor-pointer"
                    ></input>
                </div>
            </div>

            <div className="mt-6 mx-72 text-center font-mono">
                <button onClick={handleSubmit} className="border-black border-2 p-4 hover:cursor-pointer">Next</button>
            </div>

            {submissionStatus && (
                <div className="mt-6 mx-72 text-center text-xl text-green-400 font-mono">{submissionStatus}</div>
            )}
        </div>
    );
}

export default TrainingPage;