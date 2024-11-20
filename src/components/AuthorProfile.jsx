import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function AuthorProfile() {
  const { authorName } = useParams(); // Get authorName from URL params
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/blogsByAuthor/${authorName}`);
        const blogsData = await response.json();
        setBlogs(blogsData);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    }

    fetchBlogs();
  }, [authorName]);

  return (
    <div className="container mt-4">
      <h2>Blogs by {authorName}</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>
            <a href={`/blog/${blog._id}`}>{blog.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
