import React, { useState, useEffect } from "react";
import { auth, createUserDoc } from "../../firebase";
import { InputBox } from "../StyledComponents";

export default function SignUp({ setSignIn }) {
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
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

    async function handleSubmit() {
        const { user } = await auth.createUserWithEmailAndPassword(
            email,
            password
        );
        console.log(user);
        createUserDoc(user, fullname, username);
    }

    return (
        <div>
            <div className="AuthForm" onSubmit={handleSubmit}>
                <h1>Pet Feed</h1>
                <InputBox
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <InputBox
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder="Full Name"
                    required
                />
                <InputBox
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <InputBox
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button
                    className="AuthFormButton"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Sign Up
                </button>
            </div>
            <div className="AuthAlt">
                Already have an account?{" "}
                <button onClick={() => setSignIn(true)}>Sign In</button>
            </div>
        </div>
    );
}
