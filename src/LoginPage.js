import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import "./style.css"; // Ensure your styles are imported correctly
import videoSrc from "./assets/BACK.mp4";
const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpData, setSignUpData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  const registerUser = (event) => {
    event.preventDefault();
    const { name, username, password, confirmPassword } = signUpData;

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
        onBeforeOpen: () => {
          document.body.classList.add("modal-open"); // Disable body scroll
        },
        onClose: () => {
          document.body.classList.remove("modal-open"); // Re-enable body scroll
        },
      });
      return;
    }

    if (localStorage.getItem(username)) {
      Swal.fire({
        icon: "error",
        title: "Username already exists",
        text: "Please choose another username.",
        onBeforeOpen: () => {
          document.body.classList.add("modal-open"); // Disable body scroll
        },
        onClose: () => {
          document.body.classList.remove("modal-open"); // Re-enable body scroll
        },
      });
      return;
    }

    const user = { name, username, password };
    localStorage.setItem(username, JSON.stringify(user));
    Swal.fire({
      icon: "success",
      title: "Account created successfully!",
      onBeforeOpen: () => {
        document.body.classList.add("modal-open"); // Disable body scroll
      },
      onClose: () => {
        document.body.classList.remove("modal-open"); // Re-enable body scroll
      },
    });

    // Clear input fields
    setSignUpData({
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  // In your loginUser function
  const loginUser = (event) => {
    event.preventDefault();
    const { username, password } = signInData;

    const storedUser = localStorage.getItem(username);
    if (!storedUser) {
      Swal.fire({
        icon: "error",
        title: "No account found",
        text: "No account found with this username.",
        position: "center",
        onBeforeOpen: () => {
          document.body.classList.add("modal-open"); // Disable body scroll
        },
        onClose: () => {
          document.body.classList.remove("modal-open"); // Re-enable body scroll
        },
      });
      return;
    }

    const user = JSON.parse(storedUser);
    if (user.password === password) {
      Swal.fire({
        icon: "success",
        title: `Welcome back, ${user.name}!`,
        timer: 2000,
        onBeforeOpen: () => {
          document.body.classList.add("modal-open"); // Disable body scroll
        },
        onClose: () => {
          document.body.classList.remove("modal-open"); // Re-enable body scroll
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Incorrect password",
        text: "Please try again.",
        onBeforeOpen: () => {
          document.body.classList.add("modal-open"); // Disable body scroll
        },
        onClose: () => {
          document.body.classList.remove("modal-open"); // Re-enable body scroll
        },
      });
    }
  };

  const handleSignUpChange = (event) => {
    const { id, value } = event.target;
    setSignUpData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSignInChange = (event) => {
    const { id, value } = event.target;
    setSignInData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div>
      <div className="logo1">
        <a href="../index.html">
          <img
            src="https://cdn.prod.website-files.com/60f685550f9f4d3b537d1987/60f68bab251e49651059fffc_logo.svg"
            alt="logo"
            className="logo-image"
          />
        </a>
      </div>

      <div className="video-background">
        <video autoPlay muted loop>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className={`container ${isSignUp ? "active" : ""}`} id="container">
        <div className="form-container sign-up">
          <form onSubmit={registerUser}>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" className="icon">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input
              type="text"
              id="name"
              value={signUpData.name}
              placeholder="Name"
              onChange={handleSignUpChange}
              required
            />
            <input
              type="text"
              id="username"
              value={signUpData.username}
              placeholder="Username"
              onChange={handleSignUpChange}
              required
            />
            <input
              type="password"
              id="password"
              value={signUpData.password}
              placeholder="Password"
              onChange={handleSignUpChange}
              required
            />
            <input
              type="password"
              id="confirmPassword"
              value={signUpData.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleSignUpChange}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        <div className="form-container sign-in">
          <form onSubmit={loginUser}>
            <h1>Sign In</h1>
            <div className="social-icons">
              <a href="#" className="icon">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email password</span>
            <input
              type="text"
              id="username"
              value={signInData.username}
              placeholder="Username"
              onChange={handleSignInChange}
              required
            />
            <input
              type="password"
              id="password"
              value={signInData.password}
              placeholder="Password"
              onChange={handleSignInChange}
              required
            />
            <a href="#">Forget Your Password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hidden" onClick={toggleForm}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button className="hidden" onClick={toggleForm}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
