import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function BlogPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [userMail, setUserMail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is signed in by looking for UserMail in localStorage
    const email = localStorage.getItem('UserMail');
    if (!email) {
      // Redirect to the sign-in page if not signed in
      // alert('You need to sign in to create a blog post.');
      navigate('/signin');
    } else {
      setUserMail(email); // Store the signed-in user's email
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogPost = {
      title,
      content,
      description,
      date: new Date().toISOString(), // Automatically store the current date
      userMail, // Add the user's email to the blog post
    };

    try {
      const response = await fetch('https://blog-now-server.vercel.app/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogPost),
      });

      if (response.ok) {
        // const data = await response.json();
        setMessage('Blog post created successfully!');
        setTitle('');
        setContent('');
        setDescription('');
      } else {
        setMessage('Failed to create blog post.');
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create a New Blog Post</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Short Description:
          </label>
          <textarea
            id="description"
            className="form-control"
            rows="2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content:
          </label>
          <textarea
            id="content"
            className="form-control"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-dark">
          Submit
        </button>
      </form>
    </div>
  );
}

export default BlogPost;
