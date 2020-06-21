import React, { useState, useEffect } from "react";
import { signInWithGoogle, auth } from "../../firebase";
import { AiOutlineGoogle } from "react-icons/ai";

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
        try {
            auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            alert("Incorrect email and/or password");
        }
    }

    function handleDemo() {
        auth.signInWithEmailAndPassword("dog@dog.com", "password");
    }

    function handleReset() {
        auth.sendPasswordResetEmail(email);
    }

    return (
        <div>
            <div className="AuthForm">
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
                <div className="ResetPassword">
                    Forgot Password?{" "}
                    <button onClick={handleReset}>Reset Password</button>
                </div>
                <button className="AuthFormButton" onClick={handleSubmit}>
                    Log In
                </button>
                <button className="AuthFormButton" onClick={handleDemo}>
                    DEMO
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
            </div>
            <div className="AuthAlt">
                Don't have an account?{" "}
                <button onClick={() => setSignIn(false)}>Sign Up</button>
            </div>
        </div>
    );
}
