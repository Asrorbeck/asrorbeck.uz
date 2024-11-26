import { useState } from "react";
import "./Header.css";

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div className="header">
      <div className="container">
        <div className="header__container">
          <a href="#" className="header__logo">
            Asrorbek's Blog
          </a>
          <div
            className={`header__burger ${menuActive ? "active" : ""}`}
            onClick={toggleMenu}
          ></div>
          <ul
            className={`header__list ${
              menuActive ? "header__list--active" : ""
            }`}
          >
            <li className="header__item">
              <a
                href="https://plain2do.com"
                target="_blank"
                className="header__link"
              >
                P2D
              </a>
            </li>
            <li className="header__item">
              <a
                href="https://ssgroup.uz"
                target="_blank"
                className="header__link"
              >
                SSG
              </a>
            </li>
            <li className="header__item">
              <a
                href="https://zypherix.uz"
                target="_blank"
                className="header__link"
              >
                ZPX
              </a>
            </li>
            <li className="header__item">
              <a href="https://t.me/Asrorbeck_AT" className="header__link">
                Blog
              </a>
            </li>
            <li className="header__item">
              <a href="https://t.me/Asrorbeck_AT" className="header__link">
                Channel
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
