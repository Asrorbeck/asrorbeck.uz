import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { Modal, Button } from "react-bootstrap";
import "react-quill/dist/quill.snow.css";

const BlogEditor = () => {
  const [content, setContent] = useState(""); // State to store the blog content
  const [blogs, setBlogs] = useState([]); // State to store fetched blogs
  const [loading, setLoading] = useState(false); // Loading state for fetching blogs
  const [saving, setSaving] = useState(false); // Saving state to show loading indicator when saving
  const [editingBlog, setEditingBlog] = useState(null); // State to store the blog being edited
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  // Fetch blogs from the API
  const fetchBlogs = async () => {
    setLoading(true); // Show loading indicator
    try {
      const response = await fetch("http://localhost:5000/blogs");
      if (!response.ok) {
        throw new Error(`Failed to fetch blogs: ${response.statusText}`);
      }
      const data = await response.json();
      setBlogs(data); // Update state with fetched blogs
    } catch (error) {
      console.error("Error fetching blogs:", error);
      alert("Failed to load blogs. Please try again.");
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // Use effect to fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle save (POST method to save blog)
  const handleSave = async () => {
    setSaving(true); // Show saving indicator
    const currentDate = new Date();
    const formattedDate = `${String(currentDate.getDate()).padStart(
      2,
      "0"
    )}.${String(currentDate.getMonth() + 1).padStart(
      2,
      "0"
    )}.${currentDate.getFullYear()}`;

    const blogData = {
      content,
      submissionDate: formattedDate,
    };

    try {
      let response;
      if (editingBlog) {
        // PUT request to update the blog if editing
        response = await fetch(
          `http://localhost:5000/blogs/${editingBlog.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(blogData),
          }
        );
      } else {
        // POST request to create a new blog
        response = await fetch("http://localhost:5000/blogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blogData),
        });
      }

      if (!response.ok) {
        throw new Error(`Failed to save blog: ${response.statusText}`);
      }

      alert("Content saved successfully!");
      setContent(""); // Clear the editor
      setEditingBlog(null); // Reset editing state
      fetchBlogs(); // Refresh the blogs after saving
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save content. Please try again.");
    } finally {
      setSaving(false); // Hide saving indicator
    }
  };

  // Handle edit (load blog content into the editor and show modal)
  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setContent(blog.content); // Set content to be edited
    setShowModal(true); // Show the modal
  };

  // Handle delete (delete blog by ID)
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/blogs/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`Failed to delete blog: ${response.statusText}`);
        }

        alert("Blog deleted successfully!");
        fetchBlogs(); // Refresh the blog list after deletion
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete blog. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <h2>{editingBlog ? "Edit Blog" : "Write Your Blog"}</h2>

      {/* Add Content Editor */}
      <div>
        <h3>{editingBlog ? "Edit Your Blog" : "Create a New Blog"}</h3>
        <ReactQuill
          value={content}
          onChange={setContent}
          theme="snow" // Default theme
          placeholder="Start writing your blog here..."
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
            ],
          }}
        />
        <div style={{ marginTop: "10px" }}>
          <Button variant="primary" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Blog"}
          </Button>
        </div>
      </div>

      {/* Display Fetched Blogs */}
      {loading && <p>Loading blogs...</p>}
      <div style={{ marginTop: "20px" }}>
        <h3>Saved Blogs</h3>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog.id}
              style={{
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <p style={{ fontSize: "14px", color: "gray" }}>
                Submitted on: {blog.submissionDate}
              </p>
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              <div style={{ marginTop: "10px" }}>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(blog)}
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(blog.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingBlog ? "Edit Blog" : "Create Blog"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactQuill
            value={content}
            onChange={setContent}
            theme="snow"
            placeholder="Start editing your blog here..."
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Update Blog"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BlogEditor;
