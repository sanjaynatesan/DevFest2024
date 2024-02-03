import "./App.css";
import TrainingPage from "./pages/TrainingPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SessionStartPage from "./pages/SessionStartPage";
import SessionPrePage from "./pages/SessionPrePage";
import TalkToUsPage from "./pages/TalkToUsPage";
import TalkToUsResultPage from "./pages/TalkToUsResultPage";
import SessionPage from "./pages/SessionPage";

function App() {
  return (
    <div className={`w-screen`}>
      <SessionPage/>
    </div>
  )
}

export default App;
