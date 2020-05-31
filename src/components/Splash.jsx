import React, { useState } from "react";
import {
  signInWithGoogle,
  signInWithFacebook,
  signInWithTwitter,
  auth,
} from "../firebase";
import {
  AiOutlineGoogle,
  AiFillFacebook,
  AiOutlineTwitter,
} from "react-icons/ai";

export default function Splash() {
  const [signIn, setSignIn] = useState(true);
  return (
    <section id="Splash">
      {signIn ? (
        <SignIn setSignIn={setSignIn} />
      ) : (
        <SignUp setSignIn={setSignIn} />
      )}
    </section>
  );
}

function SignUp({ setSignIn }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        console.log(error.code);
        console.log(error.message);
      });
  }

  return (
    <div>
      <form className="AuthForm" onSubmit={handleSubmit}>
        <h1>Petsagram</h1>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          required
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button className="AuthFormButton" type="submit" onClick={handleSubmit}>
          Sign Up
        </button>
      </form>
      <div className="AuthAlt">
        Already have an account?{" "}
        <button onClick={() => setSignIn(true)}>Sign In</button>
      </div>
    </div>
  );
}

function SignIn({ setSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    auth.signInWithEmailAndPassword(email, password).catch(function (error) {
      console.log(error.code);
      console.log(error.message);
    });
  }

  return (
    <div>
      <form className="AuthForm" onSubmit={handleSubmit}>
        <h1>Petsagram</h1>
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
        <button className="AuthFormButton" type="submit" onClick={handleSubmit}>
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
      </form>
      <div className="AuthAlt">
        Don't have an account?{" "}
        <button onClick={() => setSignIn(false)}>Sign Up</button>
      </div>
    </div>
  );
}
