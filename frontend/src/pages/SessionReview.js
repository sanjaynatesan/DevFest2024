import React, { useState, useEffect } from "react";
import { Box, Fade } from "@chakra-ui/react";
import { FaPause, FaPlay } from "react-icons/fa";

function SessionReviewPage() {
    const [review, setReview] = useState('stim');
    const [submit, setSubmit] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isDropped, setIsDropped] = useState({ zone1: false, zone2: false, zone3: false, zone4: false });

    useEffect(() => {
        // Disable scrolling when the page loads
        document.body.style.overflow = 'hidden';
        return () => {
            // Re-enable scrolling when the component unmounts
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleDragStart = (e, item) => {
        e.dataTransfer.setData("text/plain", item);
    };

    const handleDrop = (e, zone) => {
        const item = e.dataTransfer.getData("text");
        setIsDropped({ ...isDropped, [zone]: item });
        e.preventDefault(); // Prevent default to allow drop
    };

    const allowDrop = (e) => {
        e.preventDefault(); // This is necessary to allow dropping as the default is not to allow it
    };

    const handleSubmit = () => {
        setVisible(false);
    }

    return (
        <div className="fixed inset-0">

            {!visible && (
                <div className="flex flex-wrap items-center justify-center h-screen">
                    <div className="flex flex-col justify-center items-center w-full">

                        <div className="text-center text-md font-mono mb-4">
                            How did you feel about that song? (Drag and Drop)
                        </div>
                        <div className="w-min text-center" draggable={true}
                             onDragStart={(e) => handleDragStart(e, 'Your Draggable Content')}>
                            <div className="text-center">
                                <img src="../assets/spotify-logo-black.svg" alt="Spotify Logo" />
                                <div className="text-sm font-mono">Song Title</div>
                                <div className="text-sm font-mono">Artist</div>
                            </div>
                        </div>
                        {submit && <div className="text-center text-md font-mono mb-4">
                            Thank you. You chose: {review}
                        </div>}
                        <div className="flex flex-wrap items-center justify-center">
                            <button onClick={handleSubmit} className="px-2 py-2 mt-8 mr-4 border-black border-2 font-mono rounded-3xl text-black hover:bg-gray-50">
                                <span>End Session</span>
                            </button>
                            <button onClick={handleSubmit} className="px-2 py-2 mt-8 border-black border-2 font-mono rounded-3xl text-black hover:bg-gray-50">
                                <span>Next</span>
                            </button>

                        </div>

                    </div>


                    {/* Drop zones positioned absolutely within the fixed container */}
                    <div onDrop={(e) => handleDrop(e, "zone1")} onDragOver={allowDrop}
                         className={`absolute top-0 w-full h-1/4 flex justify-center items-end border-2 ${isDropped.zone1 ? 'bg-gray-300' : 'bg-gray-100'}`}>
                        {isDropped.zone1 ? "Redirecting to Spotify." : "Open in Spotify"}
                    </div>
                    <div onDrop={(e) => handleDrop(e, "zone4")} onDragOver={allowDrop}
                         className={`absolute left-0 w-1/4 h-full flex justify-end items-center border-2 ${isDropped.zone4 ? 'bg-gray-300' : 'bg-gray-100'}`}>
                        {isDropped.zone4 ? "You did not like this song." : "Not Feeling It."}

                    </div>
                    <div onDrop={(e) => handleDrop(e, "zone2")} onDragOver={allowDrop}
                         className={`absolute right-0 w-1/4 h-full flex justify-start items-center border-2 text-end ${isDropped.zone2 ? 'bg-gray-300' : 'bg-gray-100'}`}>
                        {isDropped.zone2 ? "You like this song!" : "Add to Playlist"}

                    </div>
                    <div onDrop={(e) => handleDrop(e, "zone3")} onDragOver={allowDrop}
                         className={`absolute bottom-0 w-full h-1/4 flex justify-center items-start border-2 ${isDropped.zone3 ? 'bg-gray-300' : 'bg-gray-100'}`}>
                        {isDropped.zone3 ? "Not really your vibe right now" : "Skip"}
                    </div>

                </div>

            )}
        </div>
    );
}

export default SessionReviewPage;