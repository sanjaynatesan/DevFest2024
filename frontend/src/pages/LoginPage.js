import {useEffect, useState} from "react";
import "../App.css";
import spotifylogo from "../assets/spotify-logo-black.svg";

function LoginPage() {
    const CLIENT_ID = "8dca5b067d01447db4b574af663fd0be";
    const REDIRECT_URI = "http://localhost:3000/callback";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";

    const [token, setToken] = useState("");

    // useEffect( () => {
    //     const hash = window.location.hash;
    //     let token = window.localStorage.getItem("token")
    //
    //     if(!token && hash){
    //         token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
    //
    //         window.location.hash = "";
    //         window.localStorage.setItem("token", token);
    //         console.log("hey");
    //         setToken(token);
    //     }
    //
    // }, [])

    useEffect(() => {
        console.log("Hi");
        const handleSpotifyCallback = async () => {
            const hash = window.location.hash;
            // let accessToken = window.localStorage.getItem("token");
            let accessToken;

            console.log(accessToken);
            if (!accessToken && hash) {
                accessToken = hash
                    .substring(1)
                    .split("&")
                    .find((elem) => elem.startsWith("access_token"))
                    .split("=")[1];

                window.location.hash = "";
                window.localStorage.setItem("token", accessToken);

                // Call the Flask endpoint to handle user login

            }
            try {
                console.log(JSON.stringify({ access_token: accessToken }))
                const response = await fetch("/callback", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ access_token: accessToken }),
                });

                if (response.ok) {
                    console.log("User authenticated and added to the database successfully");
                } else {
                    console.error("Failed to authenticate user");
                }
            } catch (error) {
                console.error("Error:", error);
            }

            setToken(accessToken);
        };

        handleSpotifyCallback();
    }, []);

    return (
        <div>
            <div className="mt-48 text-center text-6xl sm:text-8xl font-mono">Polyphony</div>
            <div className="my-20 text-center">
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
                    <button className="px-4 py-3 text-center border-black border-4 font-mono rounded-3xl text-black hover:bg-gray-50">
                        <div className="flex flex-row">
                            <div className="w-1/6">
                                <img src={spotifylogo} alt="spotify"/>
                            </div>
                            <div className="w-5/6 py-2 pl-6 pr-12 text-sm sm:text-lg whitespace-nowrap">
                                Login with Spotify
                            </div>
                        </div>
                </button>
                </a>
            </div>
        </div>
    );
}

export default LoginPage;