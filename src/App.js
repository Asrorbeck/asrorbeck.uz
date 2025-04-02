import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Hero from "./Components/Hero/Hero";
import "./index.css";
import "./Fonts/Fonts.css";
import BlogEditor from "./Components/Test/Test";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          {/* <Route path="/test" element={<BlogEditor />} />{" "} */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
