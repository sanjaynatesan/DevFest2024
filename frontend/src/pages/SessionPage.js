import { Route, Routes, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import { Container } from "@chakra-ui/layout";
import { FaPause, FaPlay } from "react-icons/fa";

function SessionPage() {



    return (
        <div>
            <div className="mt-20 text-center text-xl sm:text-2xl font-mono mb-20">
                Take a Listen to the Following Song:
            </div>
            <div className="flex justify-center items-center py-18 gap-x-8"> {/* Adjusted for closer horizontal positioning */}
                <div className="text-center"> {/* Removed mx-60 to bring details closer to controls */}
                    <div className="text-xl sm:text-xl font-mono">Song Title</div>
                    <div className="text-xl sm:text-xl font-mono">Artist</div>
                    <div className="text-xl sm:text-xl font-mono">Album</div>
                </div>
                <div className="flex justify-center items-center gap-x-4"> {/* Controls are already centered; no change needed here */}
                    <button className="px-4 py-3 text-center border-black border-4 font-mono rounded-3xl text-black hover:bg-gray-50 flex items-center justify-center">
                        <FaPlay className="text-lg"/>
                        <span>Play</span>
                    </button>
                    <button className="px-4 py-3 text-center border-black border-4 font-mono rounded-3xl text-black hover:bg-gray-50 flex items-center justify-center gap-x-2">
                        <FaPause className="text-lg"/>
                        <span>Pause</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SessionPage;
