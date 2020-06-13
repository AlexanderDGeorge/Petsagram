import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { auth, getUserDoc } from "../firebase";
import Nav from "./Nav";
import Splash from "./Splash";
import Search from "./Search";
import Home from "./Home";
import Post from "./Post/Post";
import Messages from "./Messages";
import { User } from "./User/User";
import UserSettings from "./User/Settings/UserSettings";
import AddPost from "./Post/AddPost";

const ApplicationWrapper = styled.section`
    height: 100%;
    width: 100%;
    display: flex;
    background-color: ${(props) => props.theme.light};
    @media screen and (max-width: 600px) {
        flex-direction: column-reverse;
    }
    @media screen and (min-width: 601px) {
        flex-direction: column;
    }
`;

export const UserContext = createContext(null);
export const DarkContext = createContext(null);
export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        border: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Arial, Helvetica, sans-serif;
        outline: none;
        color: ${(props) => props.theme.black};
        transition: all 0.5s linear;
    }   
`;

export default function Application() {
    const [currentUser, setCurrentUser] = useState(null);
    const [darkMode, setDarkMode] = useState(null);

    const light = {
        dark: "#555555",
        mid: "#aaaaaa",
        accent: "#cccccc",
        light: "#fafafa",
        white: "white",
        black: "black",
        lightmain: "#f57a80",
        main: "#f4676e",
        darkmain: "#f2545c",
        blue: "#0073bb",
    };

    const dark = {
        dark: "#fafafa",
        mid: "#aaaaaa",
        accent: "#999999",
        light: "#555555",
        white: "#333333",
        black: "#fafafa",
        lightmain: "#f2545c",
        main: "#f4676e",
        darkmain: "#f2545c",
        blue: "#0073bb",
    };

    const theme = darkMode ? dark : light;

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setCurrentUser(await getUserDoc(user.uid));
            } else {
                setCurrentUser(null);
            }
        });
        setDarkMode(JSON.parse(localStorage.getItem("darkMode")));
    }, []);

    function setMode() {
        setDarkMode(!darkMode);
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }

    window.currentUser = currentUser;
    window.auth = auth;

    if (currentUser) {
        return (
            <ThemeProvider theme={theme}>
                <ApplicationWrapper>
                    <UserContext.Provider
                        value={{ currentUser, setCurrentUser }}
                    >
                        <DarkContext.Provider value={{ darkMode, setMode }}>
                            <GlobalStyle />
                            <BrowserRouter>
                                <Route path="/" component={Nav} />
                                <Route path="/user" component={User} />
                                <Route path="/search" component={Search} />
                                <Route path="/messages" component={Messages} />
                                <Route
                                    path="/settings"
                                    component={UserSettings}
                                />
                                <Route path="/post/add" component={AddPost} />
                                <Route path="/post/:id" component={Post} />
                                <Route exact path="/" component={Home} />
                            </BrowserRouter>
                        </DarkContext.Provider>
                    </UserContext.Provider>
                </ApplicationWrapper>
            </ThemeProvider>
        );
    } else {
        return (
            <ThemeProvider theme={theme}>
                <UserContext.Provider value={{ currentUser }}>
                    <DarkContext.Provider value={{ darkMode }}>
                        <GlobalStyle />
                        <Splash />
                    </DarkContext.Provider>
                </UserContext.Provider>
            </ThemeProvider>
        );
    }
}
