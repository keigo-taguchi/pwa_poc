import React from "react";
import "@whereby.com/browser-sdk/embed";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Whereby } from "./page/Whereby";
import { WherebyMeeting } from "./page/Whereby-meeting";

import Zoom from "./page/Zoom";
import Home from "./page/Home";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pwa_poc/" element={<Home />} />
        <Route path="/pwa_poc/whereby" element={<Whereby />} />
        <Route path="/pwa_poc/whereby-meeting" element={<WherebyMeeting />} />
        <Route path="/pwa_poc/zoom" element={<Zoom />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
