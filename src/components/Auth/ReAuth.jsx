import React, { useState } from "react";
import styled from "styled-components";
import { authProvider, auth } from "../../firebase";
import { InputBox, ColorButton } from "../StyledComponents";

const ReAuthDiv = styled.div`
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 2%;
    > h4 {
        font-weight: 400;
        text-align: center;
    }
    > * {
        height: 50px;
        width: 100%;
    }
`;

export default function ReAuth({ setOpen }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleClick() {
        const credentials = authProvider(email, password);
        try {
            await auth.currentUser.reauthenticateWithCredential(credentials);
            setOpen(false);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <ReAuthDiv>
            <h4>Reauthenticate to make changes!</h4>
            <InputBox
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <InputBox
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <ColorButton onClick={handleClick}>Submit</ColorButton>
        </ReAuthDiv>
    );
}
