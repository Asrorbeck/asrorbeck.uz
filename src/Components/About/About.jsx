import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { aboutService } from "../../services/aboutService";
import "./About.css";

const About = () => {
  const [aboutContent, setAboutContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      const { data, error } = await aboutService.get();
      if (error) {
        console.error("Error fetching about:", error);
        setAboutContent("<p>Men haqimda ma'lumotlar...</p>");
      } else {
        setAboutContent(data?.content || "<p>Men haqimda ma'lumotlar...</p>");
      }
      setLoading(false);
      document.title = "Men Haqimda - Asrorbek's Blog";
    };
    fetchAbout();
  }, []);

  return (
    <div className="blog-post">
      <div className="container">
        <div className="blog-post__wrapper">
          <div className="blog-post__container">
            <div className="blog-post__navigation">
              <Link to="/" className="blog-post__back-link">
                ← Bosh sahifaga qaytish
              </Link>
            </div>

            <article className="blog-post__article">
              <header className="blog-post__header">
                <h1 className="blog-post__title">Men Haqimda</h1>
              </header>

              <div className="blog-post__content">
                {loading ? (
                  <div style={{ textAlign: "center", padding: "40px" }}>
                    Yuklanmoqda...
                  </div>
                ) : (
                  <div
                    className="blog-post__body"
                    dangerouslySetInnerHTML={{ __html: aboutContent }}
                  />
                )}
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

