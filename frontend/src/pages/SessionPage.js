import React, {useEffect, useState} from "react";
import {Box, Container, Fade, SlideFade} from "@chakra-ui/react";
import { FaPause, FaPlay } from "react-icons/fa";
import sessionpagebackground from "../assets/sessionpagebackground.svg";

function SessionPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [review, setReview] = useState('');
    const [next, setNext] = useState(false);
    const [isHovering, setIsHovering] = useState({ zone1: false, zone2: false, zone3: false, zone4: false });
    const [zone1Hover, setZone1Hover] = useState(false);
    const [zone2Hover, setZone2Hover] = useState(false);
    const [zone3Hover, setZone3Hover] = useState(false);
    const [zone4Hover, setZone4Hover] = useState(false);

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
        // Reset the visibility of all zones to true when starting to drag
        setIsHovering({ zone1: false, zone2: false, zone3: false, zone4: false });
    };

    const handleDrop = (e, zone, choice) => {
        e.preventDefault();
        const item = e.dataTransfer.getData("text");

        // Update the review based on the choice
        setReview("Thank you for your choice: " + choice);

        // Set all zones to not dropped and not hovering
        setIsHovering({ zone1: false, zone2: false, zone3: false, zone4: false});
    };



    const allowDrop = (e) => {
        e.preventDefault(); // This is necessary to allow dropping as the default is not to allow it
    };

    function handleToggle() {
        setIsOpen(true);
    }

    function handleSubmit() {
        setSubmit(!submit);
        setIsOpen(false);
        setNext(!next);
        setZone1Hover(true);
        setZone2Hover(true);
        setZone3Hover(true);
        setZone4Hover(true);

    }

    function goHome(){
        window.location.href = "/";
    }

    function resetZone(zone) {
        if (zone === 1) {
            setZone2Hover(false);
            setZone3Hover(false);
            setZone4Hover(false);
        }
        if (zone === 2) {
            setZone1Hover(false);
            setZone3Hover(false);
            setZone4Hover(false);
        }
        if (zone === 3) {
            setZone1Hover(false);
            setZone2Hover(false);
            setZone4Hover(false);
        }
        if (zone === 4) {
            setZone1Hover(false);
            setZone2Hover(false);
            setZone3Hover(false);
        }

    }


    return (
        <div>
            <img src={sessionpagebackground} alt="background wave" className="fixed inset-0 w-full h-full object-cover z-0"
                style={{"zIndex": -1}}/>
            {!submit && <div>
                <Fade in={!submit} transition={{exit: {duration: .25}, enter: {duration: 1}}}>
                    <div className="mt-20 text-center text-xl sm:text-2xl font-mono mb-20 text-black">
                        Take a Listen to the Following Song:
                    </div>
                    <div className="flex justify-center items-center py-18 gap-x-8">
                        <div className="text-center">
                            <div className="text-xl sm:text-xl font-mono">Song Title</div>
                            <div className="text-xl sm:text-xl font-mono">Artist</div>
                            <div className="text-xl sm:text-xl font-mono">Album</div>
                        </div>
                        <div className="flex justify-center items-center gap-x-4">
                            <button onClick={handleToggle} className="px-4 py-3 text-center border-black border-4 font-mono rounded-3xl text-black hover:bg-gray-50 flex items-center justify-center">
                                <FaPlay className="text-lg"/>
                                <span>Play</span>
                            </button>
                            <button className="px-4 py-3 text-center border-black border-4 font-mono rounded-3xl text-black hover:bg-gray-50 flex items-center justify-center gap-x-2">
                                <FaPause className="text-lg"/>
                                <span>Pause</span>
                            </button>
                        </div>
                    </div>
                    {/* Use a flex container to center the Now Playing bar */}
                    <div className="flex justify-center items-center w-full">
                        <Fade in={isOpen} transition={{exit: {duration: .25}, enter: {duration: 1}}}>
                            <Box
                                p="16px"
                                color="white"
                                mt="4"
                                bg="gray.900"
                                rounded="md"
                                shadow="md"
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                className="w-50%" // Adjust width as needed
                            >
                                <Box display="flex" alignItems="center">
                                    <Box as="span" mr="12px" fontSize="lg" fontWeight="semibold">
                                        Now Playing:
                                    </Box>
                                    <Box as="span" fontSize="md">
                                        Song Title - Artist Name
                                    </Box>
                                </Box>
                                {/* Placeholder for additional content or controls */}
                            </Box>
                            <div className="flex flex-wrap items-center justify-center">
                                <button onClick={goHome} className="px-2 py-2 mt-8 mr-4 border-black border-2 font-mono rounded-3xl text-black hover:bg-gray-50">
                                    <span>End Session</span>
                                </button>
                                <button onClick={handleSubmit} className="px-2 py-2 mt-8 border-black border-2 font-mono rounded-3xl text-black hover:bg-gray-50">
                                    <span>Next</span>
                                </button>
                            </div>
                        </Fade>

                    </div>
                </Fade>
            </div>}

            {submit && <div>
                <Fade in={submit} transition={{exit: {duration: .25}, enter: {duration: 1}}}>

                    <div className="fixed inset-0">

                        {next && (
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
                                        {review}
                                    </div>}
                                    <div className="flex flex-wrap items-center justify-center">
                                        <button onClick={goHome} className="px-2 py-2 mt-8 mr-4 border-black border-2 font-mono rounded-3xl text-black hover:bg-gray-50">
                                            <span>End Session</span>
                                        </button>
                                        <button onClick={handleSubmit} className="px-2 py-2 mt-8 border-black border-2 font-mono rounded-3xl text-black hover:bg-gray-50">
                                            <span>Next</span>
                                        </button>

                                    </div>

                                </div>

                                <div
                                    className={`absolute top-0 w-full`}
                                    onDrop={(e) => handleDrop(e, "zone1", "Open in Spotify")}
                                    onDragOver={() => setZone1Hover(true)}
                                    style={{ height: '30vh' }} // Ensure it takes up 25% of the viewport height
                                >
                                    <SlideFade in={zone1Hover} offsetX="0" offsetY="-20px" transition={{ exit: { duration: 1 }, enter: { duration: 1, delay: 0.25 } }} className={"w-full h-full"}>
                                        <Box
                                            p="40px"
                                            color="white"
                                            bg="#1DB954" // Spotify green
                                            rounded="md"
                                            shadow="md"
                                            w="100%"
                                            h="100%" // Make sure the Box fills the entire parent div
                                            display="flex" // To center the text within
                                            alignItems="center" // Aligns vertically
                                            justifyContent="center" // Aligns horizontally
                                            onDragOver={allowDrop}
                                            onDragLeave={() => setZone1Hover(false)}
                                            onDrop={() => resetZone(1)}
                                        >
                                            Open in Spotify
                                        </Box>
                                    </SlideFade>
                                </div>

                                <div
                                    className={`absolute bottom-0 w-full`}
                                    onDrop={(e) => handleDrop(e, "zone3", "Skip")}
                                    onDragOver={() => setZone3Hover(true)}
                                    onDragLeave={() => setZone3Hover(false)}
                                    style={{ height: '25vh' }} // Ensure it takes up 25% of the viewport height
                                >
                                    <SlideFade in={zone3Hover} offsetX="0" offsetY="-20px" transition={{ exit: { duration: 1 }, enter: { duration: 1, delay: 0.25 } }} className={"w-full h-full"}>
                                        <Box
                                            p="40px"
                                            color="white"
                                            bg="#FFB954" // Spotify green
                                            rounded="md"
                                            shadow="md"
                                            w="100%"
                                            h="100%" // Make sure the Box fills the entire parent div
                                            display="flex" // To center the text within
                                            alignItems="center" // Aligns vertically
                                            justifyContent="center" // Aligns horizontally
                                            onDragOver={allowDrop}
                                            onDragLeave={() => setZone3Hover(false)}
                                            onDrop={() => resetZone(3)}
                                        >
                                            Skip this Song
                                        </Box>
                                    </SlideFade>
                                </div>

                                <div
                                    className={`absolute left-0 w-1/4 h-full flex justify-center items-center bg-spotify-green`} // Adjusted classes
                                    onDrop={(e) => handleDrop(e, "zone4", "I don't like this song")}
                                    onDragOver={() => setZone4Hover(true)}
                                    onDragLeave={() => setZone4Hover(false)}
                                >
                                    <SlideFade in={zone4Hover} offsetX="20px" offsetY="0" transition={{ exit: { duration: 1 }, enter: { duration: 1, delay: 0.25 } }} className={"w-full h-full"}>
                                        <Container
                                            p="40px"
                                            color="white"
                                            bg="#000000" // Spotify green
                                            rounded="md"
                                            shadow="md"
                                            w="full" // Make sure the Box takes the width of the parent div
                                            h="full" // Make sure the Box takes the height of the parent div
                                            display="flex" // To center the text within
                                            alignItems="center" // Aligns vertically
                                            justifyContent="center" // Aligns horizontally
                                            onDragOver={allowDrop}
                                            onDragLeave={() => setZone4Hover(false)}
                                            onDrop={() => resetZone(4)}
                                        >
                                            I don't like this song
                                        </Container>
                                    </SlideFade>
                                </div>


                                <div
                                    className={`absolute right-0 w-1/4 h-full flex justify-center items-center`} // Adjusted classes
                                    onDrop={(e) => handleDrop(e, "zone2", "Add to Library")}
                                    onDragOver={() => setZone2Hover(true)}
                                    onDragLeave={() => setZone2Hover(false)}
                                >
                                    <SlideFade in={zone2Hover} offsetX="20px" offsetY="0" transition={{ exit: { duration: 1 }, enter: { duration: 1, delay: 0.25 } }} className={"w-full h-full"}>
                                        <Container
                                            p="40px"
                                            color="white"
                                            bg="#481F02"
                                            rounded="md"
                                            shadow="md"
                                            w="full" // Make sure the Box takes the width of the parent div
                                            h="full" // Make sure the Box takes the height of the parent div
                                            display="flex" // To center the text within
                                            alignItems="center" // Aligns vertically
                                            justifyContent="center" // Aligns horizontally
                                            onDragOver={allowDrop}
                                            onDragLeave={() => setZone2Hover(false)}
                                            onDrop={() => resetZone(2)}
                                        >
                                            Add to Playlist
                                        </Container>
                                    </SlideFade>
                                </div>




                            </div>

                        )}
                    </div>
                </Fade>
            </div>}


        </div>
    );
}

export default SessionPage;