import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { blogService } from "../../services/blogService";
import "./BlogPost.css";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await blogService.getBySlug(slug);
      if (error || !data) {
        setPost(null);
      } else {
        setPost(data);
      }

      // Fetch all posts for navigation
      const { data: postsData } = await blogService.getAll();
      if (postsData) {
        setAllPosts(postsData);
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  // Find previous and next posts
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

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

      // Helper function to update or create meta tags
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

      const updateOrCreateMetaName = (name, content) => {
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

      // Extract image from post content or use default
      const extractImageFromContent = (htmlContent) => {
        if (!htmlContent) return null;
        const imgMatch = htmlContent.match(/<img[^>]+src=["']([^"']+)["']/i);
        return imgMatch ? imgMatch[1] : null;
      };

      // Get featured image or extract from content or use default
      const postImage =
        post.featured_image ||
        post.image_url ||
        extractImageFromContent(post.content) ||
        null;

      // Build absolute image URL
      const baseUrl = window.location.origin;
      const ogImage = postImage
        ? postImage.startsWith("http")
          ? postImage
          : postImage.startsWith("/")
          ? `${baseUrl}${postImage}`
          : `${baseUrl}/${postImage}`
        : `${baseUrl}/logo512.png`; // Default logo if no image

      // Ensure og:image is absolute URL
      const finalOgImage = ogImage.startsWith("http")
        ? ogImage
        : `${baseUrl}${ogImage}`;

      // Open Graph meta tags
      updateOrCreateMeta("og:title", post.title);
      updateOrCreateMeta("og:description", post.excerpt || post.title);
      updateOrCreateMeta("og:type", "article");
      updateOrCreateMeta("og:url", window.location.href);
      updateOrCreateMeta("og:image", finalOgImage);
      updateOrCreateMeta("og:image:secure_url", finalOgImage);
      updateOrCreateMeta("og:image:type", "image/png");
      updateOrCreateMeta("og:image:width", "1200");
      updateOrCreateMeta("og:image:height", "630");
      updateOrCreateMeta("og:site_name", "asrorbeck.uz");
      updateOrCreateMeta("og:locale", "uz_UZ");

      // Article specific meta tags
      if (post.date) {
        updateOrCreateMeta(
          "article:published_time",
          new Date(post.date).toISOString()
        );
      }
      updateOrCreateMeta("article:author", "Asrorbek Tursunpulatov");
      updateOrCreateMeta("article:section", "Blog");

      // Twitter Card meta tags
      updateOrCreateMetaName("twitter:card", "summary_large_image");
      updateOrCreateMetaName("twitter:title", post.title);
      updateOrCreateMetaName("twitter:description", post.excerpt || post.title);
      updateOrCreateMetaName("twitter:image", finalOgImage);
      updateOrCreateMetaName("twitter:site", "@asrorbeck");
      updateOrCreateMetaName("twitter:creator", "@asrorbeck");

      // Debug: Console'da tekshirish (faqat development'da)
      if (process.env.NODE_ENV === "development") {
        console.log("Open Graph Meta Tags Updated:", {
          title: post.title,
          description: post.excerpt,
          image: finalOgImage,
          url: window.location.href,
        });
        // Meta teglarni ko'rish
        setTimeout(() => {
          const ogTags = Array.from(
            document.querySelectorAll('meta[property^="og:"]')
          ).map((meta) => ({
            property: meta.getAttribute("property"),
            content: meta.getAttribute("content"),
          }));
          console.log("Current OG Tags:", ogTags);
        }, 100);
      }
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

  if (loading) {
    return (
      <div className="blog-post">
        <div className="container">
          <div style={{ textAlign: "center", padding: "100px 20px" }}>
            Yuklanmoqda...
          </div>
        </div>
      </div>
    );
  }

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
