import React, {useEffect, useState} from "react";
import {Box, Container, Fade, SlideFade} from "@chakra-ui/react";
import { FaPause, FaPlay } from "react-icons/fa";
import sessionpagebackground from "../assets/sessionpagebackground.svg";
import {useLocation} from "react-router";

function SessionPage() {
    const [responses, setResponses] = useState([]);
    const [songCount, setSongCount] = useState(0);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [currentSong, setCurrentSong] = useState({})
    const [isOpen, setIsOpen] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [review, setReview] = useState('');
    const [nextPlay, setNextPlay] = useState(false);
    const [nextSong, setNextSong] = useState(false);
    const [isHovering, setIsHovering] = useState({ zone1: false, zone2: false, zone3: false, zone4: false });
    const [zone1Hover, setZone1Hover] = useState(false);
    const [zone2Hover, setZone2Hover] = useState(false);
    const [zone3Hover, setZone3Hover] = useState(false);
    const [zone4Hover, setZone4Hover] = useState(false);
    const [choice, setChoice] = useState('');
    const [emotion, setEmotion] = useState('');
    const[isLoading, setIsLoading] = useState(false);
    const location = useLocation();



    useEffect(() => {
        setIsLoading(true);

        const { message } = location.state || {};
        console.log(message);
        handleSongChange({"title": message.title, "artist": message.artist, "image": message.image, "uri": message.song_uri});
        setEmotion(message.feelings);
        setIsLoading(false);
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
        setChoice(choice);
        console.log("Choice: " + choice);
        e.preventDefault();
        const item = e.dataTransfer.getData("text");

        // Update the review based on the choice
        setReview("Thank you for your choice: " + choice);

        // Set all zones to not dropped and not hovering
        setIsHovering({ zone1: false, zone2: false, zone3: false, zone4: false});


        if(choice === "up" || choice === "right"){
            console.log(currentSong.title);

            for (let i = 0; i < responses.length; i++) {
                console.log(responses[i]);
            }
            addResponse(currentSong.title);
            // TODO: Redirect to stats page to add the playlist
            setSongCount(songCount + 1);
            if(songCount === 50){
                goHome();
            }
        }
    };

    function handleSongChange(song){
        setCurrentSong(song);
    }



    const allowDrop = (e) => {
        e.preventDefault(); // This is necessary to allow dropping as the default is not to allow it
    };

    function handleToggle() {
        setIsOpen(true);
    }

    // song_uri, username, reaction, emotion

    async function handleSubmitNextPlay(choice) {

        setIsLoading(true);
        setSubmit(!submit);
        setIsOpen(false);
        setNextPlay(!nextPlay);


        console.log("Choice: " + choice);

        if (choice === "up") {

            console.log("About to add to response array");
            addResponse(currentSong.uri);

            console.log("About to retrain");

            setIsLoading(true);

            const response = await fetch('/retrain', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    song_uri: currentSong.uri,
                    username: window.localStorage.getItem("username"),
                    reaction: true,
                    emotion: emotion
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            await getRecommendation();
            let url = "https://open.spotify.com/track/" + currentSong.uri.split(":")[2];
            console.log(url);
            window.open(url, '_blank');
            setIsLoading(false);
        }else if(choice === "right"){
            // Add to Playlist
            addResponse(currentSong.title);

        }else if(choice === "down"){
            getRecommendation();
        }else if(choice === "left"){

            getRecommendation();
            // I don't like this song, give me another recommendation

        }

    }


    async function getRecommendation(){
        console.log("About to get recommendation");
        const response = await fetch('/recommendation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: window.localStorage.getItem("username"),
                emotion: emotion
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        handleSongChange({"title": data.title, "artist": data.artist, "image": data.image, "uri": data.song_uri});
    }

    // async function sendReply(reply){
    //     if(reply === "up"){
    //         console.log("About to retrain");
    //         const response = await fetch('/retrain', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 song_uri: currentSong.uri,
    //                 username: window.localStorage.getItem("username"),
    //                 reaction: 1,
    //                 emotion: emotion
    //             }),
    //         });
    //
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         const data = await response.json();
    //         console.log(data);
    //         await getRecommendation();
    //     }
    // }

        async function handleSubmitNextSong() {

            setSubmit(!submit);
            setIsOpen(false);
            setNextPlay(!nextPlay);
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

    function addResponse(song) {
        setResponses([...responses, song]);
    }


    return (
        <div>
            <img src={sessionpagebackground} alt="background wave" className="fixed inset-0 w-full h-full object-cover z-0"
                 style={{"zIndex": -1}}/>
            {!submit && !isLoading && <div>
                <Fade in={!submit} transition={{exit: {duration: .25}, enter: {duration: 1}}}>
                    <div className="mt-20 text-center text-xl sm:text-2xl font-mono mb-20 text-black">
                        Take a Listen to the Following Song:
                    </div>
                    <div className="flex justify-center items-center py-18 gap-x-8">
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 object-cover">
                                <img src={currentSong.image} alt="Album Art" className="w-full h-full"/>
                            </div>
                            <div className="flex flex-col items-center mt-2"> {/* Add margin-top if needed */}
                                <div className="text-lg font-mono text-center">{currentSong.title}</div>
                                <div className="text-sm font-mono text-center">{currentSong.artist}</div>
                            </div>
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
                                        <div className="text-md font-mono">{currentSong.title}</div>
                                        <div className="text-sm font-mono">{currentSong.artist}</div>

                                    </Box>
                                </Box>
                                {/* Placeholder for additional content or controls */}
                            </Box>
                            <div className="flex flex-wrap items-center justify-center">
                                <button onClick={goHome} className="px-2 py-2 mt-8 mr-4 border-black border-2 font-mono rounded-3xl text-black hover:bg-gray-50">
                                    <span>End Session</span>
                                </button>
                                <button onClick={handleSubmitNextSong} className="px-2 py-2 mt-8 border-black border-2 font-mono rounded-3xl text-black hover:bg-gray-50">
                                    <span>Next</span>
                                </button>
                            </div>
                        </Fade>

                    </div>
                </Fade>
            </div>}

            {submit && !isLoading && <div>
                <Fade in={submit} transition={{exit: {duration: .25}, enter: {duration: 1}}}>

                    <div className="fixed inset-0">

                        {nextPlay && (
                            <div className="flex flex-wrap items-center justify-center h-screen">
                                <div className="flex flex-col justify-center items-center w-full">

                                    <div className="text-center text-md font-mono my-4">
                                        How did you feel about that song? (Drag and Drop)
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div
                                            className="w-24 h-24 object-cover"
                                            draggable={true}
                                            onDragStart={(e) => handleDragStart(e, currentSong.uri)}>
                                            <img src={currentSong.image} alt="Album Art" className="w-full h-full"/>
                                        </div>
                                        <div className="flex flex-col items-center mt-2"> {/* Add margin-top if needed */}
                                            <div className="text-lg font-mono text-center">{currentSong.title}</div>
                                            <div className="text-sm font-mono text-center">{currentSong.artist}</div>
                                        </div>
                                    </div>

                                    {submit && <div className="text-center text-md font-mono">
                                        {review}
                                    </div>}
                                    <div className="flex flex-wrap items-center justify-center">
                                        <button onClick={goHome} className="px-2 py-2 mt-8 mr-4 border-black border-2 font-mono rounded-3xl text-black hover:bg-gray-50">
                                            <span>End Session</span>
                                        </button>
                                        <button onClick={() => handleSubmitNextPlay(choice)} className="px-2 py-2 mt-8 border-black border-2 font-mono rounded-3xl text-black hover:bg-gray-50">
                                            <span>Next</span>
                                        </button>

                                    </div>

                                </div>

                                <div
                                    className={`absolute top-0 w-full`}
                                    onDrop={(e) => handleDrop(e, "zone1", "up")}
                                    onDragOver={() => setZone1Hover(true)}
                                    style={{ height: '30vh' }} // Ensure it takes up 25% of the viewport height
                                >
                                    <SlideFade in={zone1Hover} offsetX="0" offsetY="-20px" transition={{ exit: { duration: 1 }, enter: { duration: 1, delay: 0.25 } }} className={"w-full h-full"}>
                                        <Box
                                            p="40px"
                                            color="white"
                                            bg="#517209"
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
                                    onDrop={(e) => handleDrop(e, "zone3", "down")}
                                    onDragOver={() => setZone3Hover(true)}
                                    onDragLeave={() => setZone3Hover(false)}
                                    style={{ height: '25vh' }} // Ensure it takes up 25% of the viewport height
                                >
                                    <SlideFade in={zone3Hover} offsetX="0" offsetY="-20px" transition={{ exit: { duration: 1 }, enter: { duration: 1, delay: 0.25 } }} className={"w-full h-full"}>
                                        <Box
                                            p="40px"
                                            color="white"
                                            bg="#5663FC" // Spotify green
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
                                    onDrop={(e) => handleDrop(e, "zone4", "left")}
                                    onDragOver={() => setZone4Hover(true)}
                                    onDragLeave={() => setZone4Hover(false)}
                                >
                                    <SlideFade in={zone4Hover} offsetX="20px" offsetY="0" transition={{ exit: { duration: 1 }, enter: { duration: 1, delay: 0.25 } }} className={"w-full h-full"}>
                                        <Container
                                            p="40px"
                                            color="white"
                                            bg="#FF9F23"
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
                                    onDrop={(e) => handleDrop(e, "zone2", "right")}
                                    onDragOver={() => setZone2Hover(true)}
                                    onDragLeave={() => setZone2Hover(false)}
                                >
                                    <SlideFade in={zone2Hover} offsetX="20px" offsetY="0" transition={{ exit: { duration: 1 }, enter: { duration: 1, delay: 0.25 } }} className={"w-full h-full"}>
                                        <Container
                                            p="40px"
                                            color="white"
                                            bg="#B87771"
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

            {isLoading && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 2, // Ensure it covers other content
                }}>
                    <p>Loading...</p>
                </div>
            )}



        </div>
    );
}

export default SessionPage;