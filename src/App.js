import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Signin from "./components/Signin";
import BlogPost from "./components/BlogPost";
import BlogDetails from "./components/BlogDetails";
import About from "./components/About";
import ProfilePage from "./components/ProfilePage";
import AuthorProfile from "./components/AuthorProfile";
import NotFound from "./components/NotFound";

export default function App() {
  const [userMail, setUserMail] = useState(localStorage.getItem("UserMail") || "");

  // Keep `userMail` in sync with `localStorage`
  useEffect(() => {
    const storedMail = localStorage.getItem("UserMail");
    if (storedMail) {
      setUserMail(storedMail);
    }
  }, []);

  return (
    <div className="mainBody">
      <Header userMail={userMail} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin setUserMail={setUserMail} />} />
        <Route path="/blogpost" element={<BlogPost />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/author/:authorName" element={<AuthorProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}
