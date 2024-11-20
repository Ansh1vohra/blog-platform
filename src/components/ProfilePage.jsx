import React, { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [authorName, setAuthorName] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [newAuthorName, setNewAuthorName] = useState('');
  const userMail = localStorage.getItem('UserMail');
  useEffect(() => {
    // Fetch user details and blogs
    async function fetchData() {
      try {
        const userResponse = await fetch('https://blog-now-server.vercel.app/api/users/fetchUser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userMail }),
        });
        const userData = await userResponse.json();
        setAuthorName(userData.authorName);

        const blogsResponse = await fetch(`https://blog-now-server.vercel.app/api/blogs/blogsByUser/${userMail}`);
        const blogsData = await blogsResponse.json();
        setBlogs(blogsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [userMail]);

  const handleUpdateAuthorName = async () => {
    try {
      const response = await fetch('https://blog-now-server.vercel.app/api/users/updateAuthorName', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMail, authorName: newAuthorName }),
      });
      const updatedUser = await response.json();
      setAuthorName(updatedUser.authorName);
      setNewAuthorName('');
    } catch (error) {
      console.error('Error updating author name:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Your Profile</h2>
      <div>
        <p><strong>Author Name:</strong> {authorName}</p>
        <input
          className='input p-2 rounded'
          type="text"
          value={newAuthorName}
          onChange={(e) => setNewAuthorName(e.target.value)}
          placeholder="Update Author Name"
        />
        <button onClick={handleUpdateAuthorName} className="btn btn-primary ms-2">Update</button>
      </div>
      <h3 className="mt-4">Your Blogs</h3>
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
