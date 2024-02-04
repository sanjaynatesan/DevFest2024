import {useEffect, useState} from "react";
import "../App.css";
import loginbackground from '../assets/loginbackground.svg';
import spotifylogo from "../assets/spotify-logo-black.svg";
import {Link} from "react-router-dom";

function LoginPage() {
    const CLIENT_ID = "516b7b9290614e308a2045dcadea221d";
    const REDIRECT_URI = "http://localhost:3000/login";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";

    const [token, setToken] = useState("");
    const [userInfo, setUserInfo] = useState(null);

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

    // const getUserInfo = () => {
    //     try {
    //         const userInfo = await fetch("/getUserInfo", {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ access_token: accessToken }),
    //         });
    //
    //         if (response.ok) {
    //             console.log("User authenticated and added to the database successfully");
    //         } else {
    //             console.error("Failed to authenticate user");
    //         }
    //         return userInfo;
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // };

    useEffect(() => {

        const hash = window.location.hash;
        let token = window.localStorage.getItem("token")

        console.log(token);
        console.log(hash); 

        if(!token && hash){
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];

            console.log(token);

            window.location.hash = "";
            window.localStorage.setItem("token", token);
            setToken(token);
        }

        const handleSpotifyCallback = async () => {
            let accessToken = window.localStorage.getItem("token");
            try {
                const response = await fetch("/callback", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ access_token: accessToken }),
                });

                if (response.ok) {
                    console.log("Logged In!");
                    const userInfo = await response.json();
                    setUserInfo(userInfo);
                    console.log(userInfo);
                    window.localStorage.setItem("display_name", userInfo['display_name'])
                    window.localStorage.setItem("username", userInfo['username'])
                    const isNew = userInfo['new'];
                    if (isNew) {
                        window.location.href = "/training";
                    } else {
                        window.location.href = "/";
                    }
                } else {
                    console.error("Failed to authenticate user");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        handleSpotifyCallback();
    }, []);

    return (
        <div>
            <img src={loginbackground} alt="background wave" className="fixed inset-0 w-full h-full object-cover z-0"
                style={{"zIndex": -1, 
                    "backgroundSize": "cover",
                    "webkitAnimation": "slidein 100s",
                    "animation": "slidein 100s",
                    "webkitAnimationFillMode": "forwards",
                    "animationFillMode": "forwards",
                    "webkitAnimationIterationCount": "infinite",
                    "animationIterationCount": "infinite",
                    "webkitAnimationDirection": "alternate",
                    "animationDirection": "alternate"              
            }}/>
            <div className="mt-48 text-center text-7xl sm:text-9xl font-outfit text-white">Polyphony</div>
            <div className="mt-20 mb-10 text-center">
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
                    <button className="px-4 py-3 text-center rounded-3xl text-ourPurple bg-white hover:bg-gray-200">
                        <div className="flex flex-row">
                            <div className="w-1/6">
                                <img src={spotifylogo} alt="spotify"/>
                            </div>
                            <div className="w-5/6 py-2 pl-6 pr-12 text-lg font-sora whitespace-nowrap">
                                Login with Spotify
                            </div>
                        </div>
                    </button>
                </a>
            </div>

            <Link to="/about">
                <div className="text-center font-sora text-lg fixed top-0 right-0 p-4 mr-8 mt-8">
                    <button className="px-5 py-3 text-center rounded-2xl text-ourPurple bg-white hover:bg-gray-200">
                        <div className="flex flex-row">
                            About
                        </div>
                    </button>
                </div>
            </Link>
        </div>
    );
}

export default LoginPage;