import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./Components/Header/Header";
import Hero from "./Components/Hero/Hero";
import Blog from "./Components/Blog/Blog";
import BlogPost from "./Components/Blog/BlogPost";
import "./index.css";
import "./Fonts/Fonts.css";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
