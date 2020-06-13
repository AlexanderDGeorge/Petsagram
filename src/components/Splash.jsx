import React, { useState } from "react";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";

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
