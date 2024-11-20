import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Signin.css";

function Signin({ setUserMail }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [authorName, setAuthorName] = useState(""); // State for Author Name
  const [askAuthorName, setAskAuthorName] = useState(false); // State to check if Author Name is needed

  // Function to send OTP
  async function sendOTP() {
    if (!email) {
      setMessage({ type: "error", text: "Please enter an email address." });
      return;
    }
    setIsLoading(true);
    try {
      const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(generatedOTP);

      const response = await fetch("https://blog-now-server.vercel.app/api/users/sendOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, OTP: generatedOTP }),
      });

      if (response.ok) {
        setIsOtpSent(true);
        setMessage({ type: "success", text: "OTP has been sent to your email." });
      } else {
        setMessage({ type: "error", text: "Failed to send OTP. Please try again." });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage({ type: "error", text: "An error occurred. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  }

  // Function to verify OTP
  function verifyOTP() {
    if (otp === generatedOtp) {
      setMessage({ type: "success", text: "OTP verified successfully!" });
    } else {
      setMessage({ type: "error", text: "Incorrect OTP. Please try again." });
    }
  }

  async function storeUser() {
    try {
      const response = await fetch("https://blog-now-server.vercel.app/api/users/fetchUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMail: email }),
      });

      if (response.ok) {
        console.log("User already exists");
        localStorage.setItem("UserMail", email);
        setUserMail(email);
        localStorage.setItem("SignIn", true);
        navigate("/");
      } else {
        setAskAuthorName(true); // Ask for Author Name if user not found
      }
    } catch (error) {
      console.error("Error while fetching user:", error);
    }
  }

  async function saveNewUser() {
    try {
      const resp = await fetch("https://blog-now-server.vercel.app/api/users/storeUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMail: email,
          authorName: authorName, // Include Author Name
          OTP: otp,
          authType: "email",
        }),
      });

      if (resp.ok) {
        console.log("User stored successfully");
        localStorage.setItem("UserMail", email);
        setUserMail(email);
        localStorage.setItem("SignIn", true);
        navigate("/");
      } else {
        setMessage({ type: "error", text: "Failed to store user. Please try again." });
      }
    } catch (error) {
      console.error("Error while storing user:", error);
    }
  }

  function handleSubmit() {
    verifyOTP();
    if (otp === generatedOtp) {
      storeUser();
    }
  }

  return (
    <div className="p-4 d-flex justify-content-center SigninCont">
      <div className="formContainer bg-offwhite d-flex gap-3 flex-column justify-content-center p-4 rounded">
        <h3 className="text-center">Sign in</h3>

        {/* Display message */}
        {message.text && (
          <div
            className={`alert ${
              message.type === "success" ? "alert-success" : "alert-danger"
            }`}
          >
            {message.text}
          </div>
        )}

        {!isOtpSent && (
          <>
            <label>Sign in with email</label>
            <label>Enter Email:</label>
            <input
              className="input p-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <button
              className="btn btn-dark"
              onClick={sendOTP}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Continue"
              )}
            </button>
          </>
        )}

        {isOtpSent && !askAuthorName && (
          <>
            <label>Enter OTP:</label>
            <input
              className="input p-2"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP"
            />
            <button
              className="btn btn-dark"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Submit OTP"
              )}
            </button>
          </>
        )}

        {askAuthorName && (
          <>
            <label>Enter Author Name:</label>
            <input
              className="input p-2"
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Enter your Author Name"
            />
            <button
              className="btn btn-dark"
              onClick={saveNewUser}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Save and Continue"
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Signin;
