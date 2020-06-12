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

export default function Application() {
    const [currentUser, setCurrentUser] = useState(null);

    const theme = {
        dark: "#555555",
        mid: "#aaaaaa",
        accent: "#cccccc",
        light: "#fafafa",
        lightmain: "#f57a80",
        main: "#f4676e",
        darkmain: "#f2545c",
        blue: "#0073bb",
    };

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

    if (auth.currentUser) {
        return (
            <section id="Application">
                <ThemeProvider theme={theme}>
                    <UserContext.Provider
                        value={{ currentUser, setCurrentUser }}
                    >
                        <BrowserRouter>
                            <Route path="/" component={Nav} />
                            <Route path="/user" component={User} />
                            <Route path="/search" component={Search} />
                            <Route path="/messages" component={Messages} />
                            <Route path="/settings" component={UserSettings} />
                            <Route path="/post/add" component={AddPost} />
                            <Route path="/post/:id" component={Post} />
                            <Route exact path="/" component={Home} />
                        </BrowserRouter>
                    </UserContext.Provider>
                </ThemeProvider>
            </section>
        );
    } else {
        return (
            <ThemeProvider theme={theme}>
                <UserContext.Provider value={{ currentUser }}>
                    <Splash />
                </UserContext.Provider>
            </ThemeProvider>
        );
    }
}
