import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="container">
      <div className="card">
        <Link to="/pwa_poc/whereby">
          <a>Whereby</a>
        </Link>
      </div>
      <div className="card">
        <Link to="/pwa_poc/Zoom">
          <a>Zoom</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
