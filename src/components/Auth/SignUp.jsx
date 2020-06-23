import React, { useState, useEffect } from "react";
import { auth, createUserDoc } from "../../firebase";
import { AuthDiv } from "../StyledComponents";

export default function SignUp({ setFlipped }) {
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
        <AuthDiv style={{ transform: "rotateY(180deg)" }}>
            <h4>Sign Up</h4>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
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
            <button type="submit" onClick={handleSubmit}>
                Sign Up
            </button>
            <div>
                Already have an account?{" "}
                <button onClick={() => setFlipped(true)}>Sign In</button>
            </div>
        </AuthDiv>
    );
}
