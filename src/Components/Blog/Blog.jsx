import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { blogService } from "../../services/blogService";
import "./Blog.css";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Month names in Uzbek
  const monthNames = {
    0: "Yanvar",
    1: "Fevral",
    2: "Mart",
    3: "Aprel",
    4: "May",
    5: "Iyun",
    6: "Iyul",
    7: "Avgust",
    8: "Sentyabr",
    9: "Oktyabr",
    10: "Noyabr",
    11: "Dekabr",
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await blogService.getAll();
      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setBlogPosts(data || []);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  // Group posts by year and month
  const groupedPosts = blogPosts.reduce((acc, post) => {
    const date = new Date(post.date);
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];

    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = [];
    }
    acc[year][month].push(post);
    return acc;
  }, {});

  // Sort years in descending order
  const sortedYears = Object.keys(groupedPosts).sort((a, b) => b - a);

  // Update document title and meta tags for blog page
  useEffect(() => {
    document.title = "Blog - Asrorbek's Blog";

    const metaDescription = document.querySelector('meta[name="description"]');
    const blogDescription =
      "Dasturlash va texnologiya haqida maqolalar. React, JavaScript, Web Development va boshqa texnologiyalar haqida foydali ma'lumotlar.";

    if (metaDescription) {
      metaDescription.setAttribute("content", blogDescription);
    } else {
      const newMetaDescription = document.createElement("meta");
      newMetaDescription.name = "description";
      newMetaDescription.content = blogDescription;
      document.head.appendChild(newMetaDescription);
    }

    // Update Open Graph meta tags
    const updateOrCreateMeta = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (meta) {
        meta.setAttribute("content", content);
      } else {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      }
    };

    updateOrCreateMeta("og:title", "Blog - Asrorbek Tursunpulatov");
    updateOrCreateMeta("og:description", blogDescription);
    updateOrCreateMeta("og:type", "website");
    updateOrCreateMeta("og:url", window.location.href);

    return () => {
      document.title = "Asrorbek's Blog";
    };
  }, []);

  return (
    <div className="blog">
      <div className="container">
        <div className="blog__wrapper">
          <div className="blog__container">
            <div className="blog__header-section">
              <h1 className="blog__main-title">BLOG</h1>
            </div>

            <div className="blog__content">
              <div className="blog__main-content">
                {loading ? (
                  <div style={{ textAlign: "center", padding: "40px" }}>
                    Yuklanmoqda...
                  </div>
                ) : blogPosts.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px" }}>
                    Hozircha blog postlar yo'q
                  </div>
                ) : (
                  <div className="blog__years-list">
                    {sortedYears.map((year) => (
                      <div key={year} className="blog__year-section">
                        <div className="blog__year-badge">{year}</div>

                        <div className="blog__year-content">
                          {Object.keys(groupedPosts[year]).map((month) => (
                            <div key={month} className="blog__month-section">
                              <h2 className="blog__month-title">{month}</h2>

                              <div className="blog__posts-list">
                                {groupedPosts[year][month].map((post) => (
                                  <Link
                                    key={post.id}
                                    to={`/blog/${post.slug}`}
                                    className="blog__post-link-wrapper"
                                  >
                                    <article className="blog__post-item">
                                      <div className="blog__post-content">
                                        <div className="blog__post-date">
                                          {new Date(post.date)
                                            .getDate()
                                            .toString()
                                            .padStart(2, "0")}{" "}
                                          {
                                            monthNames[
                                              new Date(post.date).getMonth()
                                            ]
                                          }
                                          , {year}
                                        </div>
                                        <h3 className="blog__post-title">
                                          {post.title}
                                        </h3>
                                      </div>
                                      <div className="blog__post-arrow">→</div>
                                    </article>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="blog__sidebar">
                <h3 className="blog__sidebar-title">Obuna Bo'ling</h3>
                <p className="blog__sidebar-text">
                  Yangi maqola, maruza va fikrlarimni{" "}
                  <a
                    href="https://t.me/Asrorbeck_AT"
                    className="blog__sidebar-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @Asrorbeck_AT
                  </a>{" "}
                  telegram kanalimda topishingiz mumkin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
