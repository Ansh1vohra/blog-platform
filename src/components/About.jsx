import React from 'react';

export default function About() {
  return (
    <div style={{ minHeight: '90vh' }} className="container mt-4">
      <h2 className="mb-4 text-center">About Us</h2>
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://img.freepik.com/free-vector/blogging-concept-illustration_114360-7884.jpg?w=740&t=st=1699950242~exp=1699950842~hmac=fb20456d7be7b2ea7f7b7958f8a7ee1527858996f548869e4972858db819cdb6"
            alt="About Us"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <p>
            Welcome to <strong>Our Blog Platform</strong>! Our mission is to provide a space for sharing knowledge, experiences, and stories that inspire and connect people. Whether you're here to read or share your thoughts, we aim to make your journey meaningful and impactful.
          </p>
          <p>
            Our platform is designed to be user-friendly, ensuring anyone can create or discover amazing content effortlessly. We believe in empowering voices and building a community that values creativity and knowledge sharing.
          </p>
          <p>
            Thank you for being a part of our growing community. Your contributions, whether as a writer or a reader, make this platform a better place!
          </p>
        </div>
      </div>
    </div>
  );
}
