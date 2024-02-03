import {useEffect, useState} from "react";
import "../App.css";
import axios from "axios";

function TalkToUsResultPage() {


    return(
        <div>
            <div className="mt-20 mx-560 text-center text-xl sm:text-2xl font-mono">
                Thank you. Here is a song we think you'll like:
            </div>
            <div className={"flex justify-center items-center py-18"}>
                <div>
                    <div className="mt-12 mx-60 text-center text-xl sm:text-xl font-mono">Song Title</div>
                    <div className="mx-60 text-center text-xl sm:text-xl font-mono">Artist</div>
                    <div className="mx-60 text-center text-xl sm:text-xl font-mono">Album</div>
                </div>
                <div>
                    <div className="mt-12 mx-60 text-center text-xl sm:text-xl font-mono">
                        Song controls
                    </div>
                </div>
            </div>
            <div className={"flex justify-center w-full mt-12"}>
                <div className="my-4 mr-2 text-center">
                    <button className="px-4 py-3 text-center border-black border-4 font-mono rounded-3xl text-black hover:bg-gray-50">
                        <div className="flex flex-row">
                            <div className="w-44 p-2 text-sm sm:text-lg whitespace-nowrap">
                                No Thanks
                            </div>
                        </div>
                    </button>
                </div>
                <div className="my-4 text-center">
                    <button className="px-4 py-3 text-center border-black border-4 font-mono rounded-3xl text-black hover:bg-gray-50">
                        <div className="flex flex-row">
                            <div className="w-44 p-2 text-sm sm:text-lg whitespace-nowrap">
                                Add to Library
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TalkToUsResultPage;