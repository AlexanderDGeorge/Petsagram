import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
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

export const UserContext = createContext(null);
export const DarkContext = createContext(null);

export default function Application() {
    const [currentUser, setCurrentUser] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    const light = {
        dark: "#555555",
        mid: "#aaaaaa",
        accent: "#cccccc",
        light: "#fafafa",
        white: "white",
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
        white: "#111111",
        lightmain: "#f2545c",
        main: "#f4676e",
        darkmain: "#f2545c",
        blue: "#0073bb",
    };

    const theme = darkMode ? dark : light;

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userDoc = await getUserDoc(user.uid);
                setCurrentUser(userDoc);
            } else {
                setCurrentUser(null);
            }
        });
    }, []);

    window.currentUser = currentUser;
    window.auth = auth;

    if (auth.currentUser) {
        return (
            <section id="Application">
                <ThemeProvider theme={theme}>
                    <UserContext.Provider
                        value={{ currentUser, setCurrentUser }}
                    >
                        <DarkContext.Provider value={{ darkMode, setDarkMode }}>
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
                </ThemeProvider>
            </section>
        );
    } else {
        return (
            <ThemeProvider theme={theme}>
                <UserContext.Provider value={{ currentUser }}>
                    <DarkContext.Provider value={{ darkMode }}>
                        <Splash />
                    </DarkContext.Provider>
                </UserContext.Provider>
            </ThemeProvider>
        );
    }
}
