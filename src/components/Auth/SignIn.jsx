import React, { useState, useEffect } from "react";
import { signInWithGoogle, auth } from "../../firebase";
import { AuthDiv } from "../StyledComponents";
import { AiOutlineGoogle } from "react-icons/ai";

export default function SignIn({ setFlipped }) {
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
        <AuthDiv>
            <h4>Sign In</h4>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <div>
                Forgot your password again?{" "}
                <button onClick={handleReset}>Reset password</button>
            </div>
            <button onClick={handleSubmit}>Sign In</button>
            <button onClick={handleDemo}>Demo</button>
            <button onClick={signInWithGoogle}>
                <AiOutlineGoogle /> Sign In Using Google
            </button>
            <div>
                Don't have an account?{" "}
                <button onClick={() => setFlipped(false)}>Sign Up</button>
            </div>
        </AuthDiv>
    );
}
