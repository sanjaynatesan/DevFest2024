import {useEffect, useState} from "react";
import "../App.css";

function TrainingPage() {
    const [recentSongs, setRecentSongs] = useState(null);
    const [recentSongsLoaded, setRecentSongsLoaded] = useState(false);
    const [album, setAlbum] = useState(null);

    useEffect( () => {
        async function fetchData() {
            try {
                const response = await fetch('http://127.0.0.1:5000/dummy');
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





    return(
        <div>
            <div className="mt-20 mx-560 text-center text-xl sm:text-2xl font-mono">Hey,&nbsp;
                <span className="text-green-400"> Erick.&nbsp; </span>
                Let's talk about your music. Here is a song you played recently:
            </div>
            <div>
                <img
                    src={recentSongsLoaded && recentSongs ? recentSongs[0].image : "#"} // Replace 'image' with the actual property name in your API response
                    alt="Song Cover"
                    className="mx-auto mt-4 w-32 h-32 rounded-md"
                />
                {/*<div className="mt-12 mx-60 text-center text-xl sm:text-xl font-mono">Song Title</div>*/}
                {/*<div className="mx-60 text-center text-xl sm:text-xl font-mono">Artist</div>*/}
                {/*<div className="mx-60 text-center text-xl sm:text-xl font-mono">Album</div>*/}
                <div
                    className="mt-12 mx-60 text-center text-xl sm:text-xl font-mono">{recentSongsLoaded && recentSongs ? recentSongs[0].title : "Song Title"}</div>
                <div
                    className="mx-60 text-center text-xl sm:text-xl font-mono">{recentSongsLoaded && recentSongs ? recentSongs[0].artist : "Artist"}</div>
                <div className="mx-60 text-center text-xl sm:text-xl font-mono">"Album"</div>

            </div>
            <div className="mt-12 mx-60 text-center text-xl sm:text-2xl font-mono">
                How does this song make you feel?
            </div>
            <div className="mt-12 mx-72 grid grid-cols-2 gap-4 font-mono">
                <div className="border-black border-2 p-4 hover:cursor-pointer">Jaded</div>
                <div className="border-black border-2 p-4 hover:cursor-pointer">Happy</div>
                <div className="border-black border-2 p-4 hover:cursor-pointer">Excited</div>
                <div className="border-black border-2 p-4 hover:cursor-pointer">Wistful</div>
                <div className="border-black border-2 p-4 hover:cursor-pointer">Faithful</div>
                <div className="border-black border-2 p-4 hover:cursor-pointer">Salacious</div>
            </div>
        </div>
    );
}

export default TrainingPage;