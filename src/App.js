import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./Components/Admin/ProtectedRoute";
import Header from "./Components/Header/Header";
import Hero from "./Components/Hero/Hero";
import Blog from "./Components/Blog/Blog";
import BlogPost from "./Components/Blog/BlogPost";
import About from "./Components/About/About";
import NotFound from "./Components/NotFound/NotFound";
import AdminLayout from "./Components/Admin/AdminLayout";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AdminNew from "./Components/Admin/AdminNew";
import AdminEdit from "./Components/Admin/AdminEdit";
import AdminAbout from "./Components/Admin/AdminAbout";
import AdminSettings from "./Components/Admin/AdminSettings";
import AdminNavigation from "./Components/Admin/AdminNavigation";
import "./index.css";
import "./Fonts/Fonts.css";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="new" element={<AdminNew />} />
                <Route path="edit/:id" element={<AdminEdit />} />
                <Route path="about" element={<AdminAbout />} />
                <Route path="navigation" element={<AdminNavigation />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
