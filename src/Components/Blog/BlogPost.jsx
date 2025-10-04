import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { blogPosts } from "../../data/blogData";
import "./BlogPost.css";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((post) => post.slug === slug);

  // Find previous and next posts
  const currentIndex = blogPosts.findIndex((post) => post.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  // Update document title and meta tags
  useEffect(() => {
    if (post) {
      // Update page title
      document.title = `${post.title} - Asrorbek's Blog`;

      // Update meta description
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute("content", post.excerpt);
      } else {
        const newMetaDescription = document.createElement("meta");
        newMetaDescription.name = "description";
        newMetaDescription.content = post.excerpt;
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

      updateOrCreateMeta("og:title", post.title);
      updateOrCreateMeta("og:description", post.excerpt);
      updateOrCreateMeta("og:type", "article");
      updateOrCreateMeta("og:url", window.location.href);

      // Update Twitter Card meta tags
      const updateOrCreateTwitterMeta = (name, content) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (meta) {
          meta.setAttribute("content", content);
        } else {
          meta = document.createElement("meta");
          meta.setAttribute("name", name);
          meta.setAttribute("content", content);
          document.head.appendChild(meta);
        }
      };

      updateOrCreateTwitterMeta("twitter:card", "summary");
      updateOrCreateTwitterMeta("twitter:title", post.title);
      updateOrCreateTwitterMeta("twitter:description", post.excerpt);
    }

    // Scroll to top when component mounts
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = "Asrorbek's Blog";
    };
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="blog-post">
      <div className="container">
        <div className="blog-post__wrapper">
          <div className="blog-post__container">
            <div className="blog-post__navigation">
              <Link to="/blog" className="blog-post__back-link">
                ← Blogga qaytish
              </Link>
            </div>

            <article className="blog-post__article">
              <header className="blog-post__header">
                <div className="blog-post__meta">
                  <span className="blog-post__date">{post.date}</span>
                </div>

                <h1 className="blog-post__title">{post.title}</h1>
              </header>

              <div className="blog-post__content">
                <div
                  className="blog-post__body"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </article>

            <div className="blog-post__pagination">
              {prevPost ? (
                <Link
                  to={`/blog/${prevPost.slug}`}
                  className="blog-post__nav-btn blog-post__prev"
                >
                  ← Oldingi
                </Link>
              ) : (
                <div className="blog-post__nav-btn blog-post__disabled blog-post__prev">
                  ← Oldingi
                </div>
              )}

              <Link
                to="/blog"
                className="blog-post__nav-btn blog-post__see-more"
              >
                Ko'proq ko'rish
              </Link>

              {nextPost ? (
                <Link
                  to={`/blog/${nextPost.slug}`}
                  className="blog-post__nav-btn blog-post__next"
                >
                  Keyingi →
                </Link>
              ) : (
                <div className="blog-post__nav-btn blog-post__disabled blog-post__next">
                  Keyingi →
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="blog-post__footer">© 2024 asrorbeck.uz</div>
      </div>
    </div>
  );
};

export default BlogPost;
