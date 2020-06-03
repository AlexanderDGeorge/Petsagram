import React, { useState, useEffect } from "react";
import {
  signInWithGoogle,
  signInWithFacebook,
  signInWithTwitter,
  auth,
} from "../../firebase";
import {
  AiOutlineGoogle,
  AiFillFacebook,
  AiOutlineTwitter,
} from "react-icons/ai";

export default function SignIn({ setSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    window.addEventListener("keypress", handleEnter);
    function handleEnter(e) {
      if (e.keyCode === 13) handleSubmit();
    }
    return () => {
      window.removeEventListener("keypress", handleEnter);
    };
  });

  function handleSubmit() {
    auth.signInWithEmailAndPassword(email, password).catch(function (error) {
      alert(error);
    });
  }

  return (
    <div>
      <div className="AuthForm">
        <h1>Pet Feed</h1>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button className="AuthFormButton" onClick={handleSubmit}>
          Log In
        </button>
        <div className="ordiv">
          <span />
          <p>OR</p>
          <span />
        </div>
        <button
          className="AuthButton"
          onClick={signInWithGoogle}
          style={{ backgroundColor: "#DB4437" }}
        >
          <AiOutlineGoogle />
          <p style={{ width: 200 }}>Log in with Google</p>
        </button>
        <button
          className="AuthButton"
          onClick={signInWithFacebook}
          style={{ backgroundColor: "#4267B2" }}
        >
          <AiFillFacebook />
          <p style={{ width: 200 }}>Log in with Facebook</p>
        </button>
        <button
          className="AuthButton"
          onClick={signInWithTwitter}
          style={{ backgroundColor: "#1DA1F2" }}
        >
          <AiOutlineTwitter />
          <p style={{ width: 200 }}>Log in with Twitter</p>
        </button>
      </div>
      <div className="AuthAlt">
        Don't have an account?{" "}
        <button onClick={() => setSignIn(false)}>Sign Up</button>
      </div>
    </div>
  );
}
