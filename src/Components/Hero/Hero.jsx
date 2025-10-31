import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { settingsService } from "../../services/settingsService";
import photo from "../../Images/photo.png";
import youtube from "../../Images/youtube.svg";
import github from "../../Images/github.svg";
import linkedin from "../../Images/linkedin.svg";
import telegram from "../../Images/telegram.svg";
import "./Hero.css";

const Hero = () => {
  const [heroText, setHeroText] = useState(
    "Exploring life's wonders, one story at a time."
  );
  const [authorName, setAuthorName] = useState("Asrorbek Tursunpulatov");
  const [jobTitle, setJobTitle] = useState("Software Engineer");
  const [socialLinks, setSocialLinks] = useState({
    youtube: "https://www.youtube.com/@asrorbektursunpulatov9833",
    github: "https://github.com/Asrorbeck",
    linkedin: "https://www.linkedin.com/in/asrorbek-tursunpulatov/",
    telegram: "https://t.me/Asrorbek_10",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await settingsService.get();
      if (data) {
        if (data.hero_body_text) setHeroText(data.hero_body_text);
        if (data.author_name) setAuthorName(data.author_name);
        if (data.job_title) setJobTitle(data.job_title);
        if (
          data.youtube_url ||
          data.github_url ||
          data.linkedin_url ||
          data.telegram_url
        ) {
          setSocialLinks({
            youtube:
              data.youtube_url ||
              "https://www.youtube.com/@asrorbektursunpulatov9833",
            github: data.github_url || "https://github.com/Asrorbeck",
            linkedin:
              data.linkedin_url ||
              "https://www.linkedin.com/in/asrorbek-tursunpulatov/",
            telegram: data.telegram_url || "https://t.me/Asrorbek_10",
          });
        }
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="hero">
      <div className="container">
        <div className="hero__wrapper">
          <div className="hero__container">
            <div className="hero__top-wrapper">
              <img src={photo} alt={authorName} className="hero__image" />

              <div className="hero__inner-wrapper">
                <h1 className="hero__header">{authorName}</h1>
                <h3 className="hero__subheader">{jobTitle}</h3>
                <ul className="hero__list">
                  {socialLinks.youtube && (
                    <li className="hero__item">
                      <a
                        href={socialLinks.youtube}
                        className="hero__link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={youtube}
                          alt={`Youtube of ${authorName}`}
                          className="hero__img-link"
                        />
                      </a>
                    </li>
                  )}
                  {socialLinks.github && (
                    <li className="hero__item">
                      <a
                        href={socialLinks.github}
                        className="hero__link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={github}
                          alt={`Github of ${authorName}`}
                          className="hero__img-link"
                        />
                      </a>
                    </li>
                  )}
                  {socialLinks.linkedin && (
                    <li className="hero__item">
                      <a
                        href={socialLinks.linkedin}
                        className="hero__link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={linkedin}
                          alt={`LinkedIn of ${authorName}`}
                          className="hero__img-link"
                        />
                      </a>
                    </li>
                  )}
                  {socialLinks.telegram && (
                    <li className="hero__item">
                      <a
                        href={socialLinks.telegram}
                        className="hero__link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={telegram}
                          alt={`Telegram of ${authorName}`}
                          className="hero__img-link"
                        />
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <p className="hero__body">{heroText}</p>

            <div className="hero__btn-wrapper">
              <Link to="/blog" className="hero__read">
                Read Blog
              </Link>
              <Link to="/about" className="hero__about">
                About Me
              </Link>
            </div>
          </div>
        </div>

        <div className="hero__footer">© 2024 asrorbeck.uz</div>
      </div>
    </div>
  );
};

export default Hero;
