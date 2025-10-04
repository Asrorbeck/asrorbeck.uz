import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import "./Header.css";

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      <div className="container">
        <div className="header__container">
          <Link to="/" className="header__logo">
            Asrorbek's Blog
          </Link>
          <div className="header__right">
            <button
              className="header__theme-toggle"
              onClick={toggleTheme}
              title={isDarkMode ? "Light mode" : "Dark mode"}
            >
              <svg
                className="theme-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {isDarkMode ? (
                  <path d="M12 3v1m0 16v1m9-9h1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                ) : (
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                )}
              </svg>
            </button>
            <ul
              className={`header__list ${
                menuActive ? "header__list--active" : ""
              }`}
            >
              <li className="header__item">
                <a
                  href="https://ssgroup-corp.com"
                  target="_blank"
                  className="header__link"
                >
                  SSG
                </a>
              </li>
              <li className="header__item">
                <Link to="/blog" className="header__link">
                  Blog
                </Link>
              </li>
            </ul>
            <div
              className={`header__burger ${menuActive ? "active" : ""}`}
              onClick={toggleMenu}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
