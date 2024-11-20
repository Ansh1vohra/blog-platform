import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from 'react-share';
import "./BlogDetails.css"

export default function BlogDetails() {
  const { id } = useParams(); // Get blog ID from URL params
  const [blog, setBlog] = useState(null);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    // Set the URL for sharing (current page URL)
    setShareUrl(window.location.href);

    // Fetch the specific blog by ID
    async function fetchBlog() {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
        if (response.ok) {
          const blog = await response.json();
  
          // Fetch the authorName using the blog's userMail
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
              blog.authorName = user.authorName || 'Unknown Author'; // Add authorName to blog
            } else {
              console.error('Error fetching user for', blog.userMail);
              blog.authorName = 'Unknown Author';
            }
          } catch (err) {
            console.error('Error fetching author name:', err);
            blog.authorName = 'Unknown Author';
          }
  
          setBlog(blog); // Set the blog object with authorName
        } else {
          console.error('Failed to fetch blog');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    }
  
    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div style={{ minHeight: '60vh' }} className="container mt-4">Loading...</div>;
  }

  return (
    <div style={{ minHeight: '60vh', width: '70vw' }} className="container mt-4">
      <h2>{blog.title}</h2>
      <p className="text-muted small">
        Posted on: {new Date(blog.date).toLocaleDateString()}
      </p>
      <p className='small'>Author:  
      {/* <Link to={`/author/${blog.authorName}`} className="text-primary ms-1"> */}
          {blog.authorName}
        {/* </Link> */}
        </p>

      {/* Social Media Share Buttons */}
      <div className="d-flex mb-3">
        <FacebookShareButton url={shareUrl} quote={blog.title} className="me-2">
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={blog.title} className="me-2">
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={shareUrl} title={blog.title} className="me-2">
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <WhatsappShareButton url={shareUrl} title={blog.title} className="me-2">
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>

      <p className="blog-content" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
        {blog.content}
      </p>
    </div>
  );
}
