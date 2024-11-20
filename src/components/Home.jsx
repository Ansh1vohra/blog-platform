import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const [search, setSearch] = useState(''); // State for search input

  useEffect(() => {
    async function fetchBlogsWithAuthors() {
      try {
        const response = await fetch('http://localhost:5000/api/blogs');
        if (response.ok) {
          const blogs = await response.json();
  
          // Fetch author names for each blog
          const blogsWithAuthors = await Promise.all(
            blogs.map(async (blog) => {
              try {
                const userResponse = await fetch('http://localhost:5000/api/users/fetchUser', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ userMail: blog.userMail }),
                });
  
                if (userResponse.ok) {
                  const user = await userResponse.json();
                  return { ...blog, authorName: user.authorName || 'Unknown Author' };
                } else {
                  console.error('Error fetching user for', blog.userMail);
                  return { ...blog, authorName: 'Unknown Author' };
                }
              } catch (err) {
                console.error('Error fetching author name:', err);
                return { ...blog, authorName: 'Unknown Author' };
              }
            })
          );
  
          setBlogs(blogsWithAuthors);
        } else {
          console.error('Failed to fetch blogs');
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setIsLoading(false);
      }
    }
  
    fetchBlogsWithAuthors();
  }, []);
  

  // Filter blogs based on search input
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase()) ||
    blog.description.toLowerCase().includes(search.toLowerCase()) ||
    blog.authorName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: '90vh' }} className="container mt-4">
      <div className="d-flex flex-column align-items-center">
        <input
          className="input p-2 searchWidth m-2 mb-4 rounded"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Update search state
        />
      </div>
      <h2 className="mb-4">Recent Blogs</h2>
      {isLoading ? (
        // Bootstrap Spinner
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row g-5">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div key={blog._id} className="col-md-4">
                <div className="card h-100">
                  <img
                    src="https://img.freepik.com/premium-vector/blog-icons-design_18591-34330.jpg?semt=ais_hybrid" // Sample image
                    className="card-img-top"
                    alt="Blog Cover"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>
                    <p className="card-text">{blog.description}</p>
                    <p className="text-muted small">
                      Posted on: {new Date(blog.date).toLocaleDateString()}
                    </p>
                    <p className="small">
                      Author: {blog.authorName}
                    </p>
                    <Link to={`/blog/${blog._id}`} className="btn btn-dark">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No blogs match your search.</p>
          )}
        </div>
      )}
      <section className='container'>
            
      </section>
    </div>
  );
}
