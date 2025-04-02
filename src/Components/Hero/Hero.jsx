import photo from "../../Images/photo.png";
import youtube from "../../Images/youtube.svg";
import github from "../../Images/github.svg";
import linkedin from "../../Images/linkedin.svg";
import telegram from "../../Images/telegram.svg";
import "./Hero.css";
const Hero = () => {
  return (
    <div className="hero">
      <div className="container">
        <div className="hero__wrapper">
          <div className="hero__container">
            <div className="hero__top-wrapper">
              <img
                src={photo}
                alt="Asrorbek Tursunpulatov"
                className="hero__image"
              />

              <div className="hero__inner-wrapper">
                <h1 className="hero__header">Asrorbek Tursunpulatov</h1>
                <h3 className="hero__subheader">Software Engineer</h3>
                <ul className="hero__list">
                  <li className="hero__item">
                    <a
                      href="https://www.youtube.com/@asrorbektursunpulatov9833"
                      className="hero__link"
                    >
                      <img
                        src={youtube}
                        alt="Youtube of Asrorbek Tursunpulatov"
                        className="hero__img-link"
                      />
                    </a>
                  </li>
                  <li className="hero__item">
                    <a
                      href="https://github.com/Asrorbeck"
                      className="hero__link"
                    >
                      <img
                        src={github}
                        alt="Github of Asrorbek Tursunpulatov"
                        className="hero__img-link"
                      />
                    </a>
                  </li>
                  <li className="hero__item">
                    <a
                      href="https://www.linkedin.com/in/asrorbek-tursunpulatov/"
                      className="hero__link"
                    >
                      <img
                        src={linkedin}
                        alt="LinkedIn of Asrorbek Tursunpulatov"
                        className="hero__img-link"
                      />
                    </a>
                  </li>
                  <li className="hero__item">
                    <a href="https://t.me/Asrorbek_10" className="hero__link">
                      <img
                        src={telegram}
                        alt="Telegram of Asrorbek Tursunpulatov"
                        className="hero__img-link"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <p className="hero__body">
              Exploring life’s wonders, one story at a time.
            </p>

            <div className="hero__btn-wrapper">
              <a href="https://t.me/Asrorbeck_AT" className="hero__read">
                Read Blog
              </a>
              <a href="https://t.me/Asrorbeck_AT" className="hero__about">
                About Me
              </a>
            </div>
          </div>
        </div>

        <div className="hero__footer">© 2024 asrorbeck.uz</div>
      </div>
    </div>
  );
};

export default Hero;
