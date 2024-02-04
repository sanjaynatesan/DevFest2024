import "./App.css";
import TrainingPage from "./pages/TrainingPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SessionStartPage from "./pages/SessionStartPage";
import SessionPrePage from "./pages/SessionPrePage";
import TalkToUsPage from "./pages/TalkToUsPage";
import TalkToUsResultPage from "./pages/TalkToUsResultPage";
import SessionPage from "./pages/SessionPage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <div className={`w-screen`}>
      <Router>
        <Routes>
          <Route path="*" exact element={<HomePage />}/>
          <Route path="/login" exact element={<LoginPage />} />
          <Route path="/training" exact element={<TrainingPage />} />
          <Route path="/" exact element={<HomePage />} />
          <Route path="/session-start" exact element={<SessionStartPage />} />
          <Route path="/session-pre" exact element={<SessionPrePage />} />
          <Route path="/session" exact element={<SessionPage />} />
          <Route path="/talk-to-us" exact element={<TalkToUsPage />} />
          <Route path="/talk-to-us-result" exact element={<TalkToUsResultPage />} />
          <Route path="/about" exact element={<AboutPage/>}/>
        </Routes>
      </Router>  
    </div>
  )
}

export default App;
