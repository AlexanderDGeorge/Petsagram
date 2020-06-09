import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { auth, getUserDoc } from "../firebase";
import Nav from "./Nav";
import Splash from "./Splash";
import Search from "./Search";
import Home from "./Home";
import Messages from "./Messages";
import { User } from "./User/User";
import UserSettings from "./User/UserSettings";
import AddPost from "./Post/AddPost";

export const UserContext = createContext(null);

export default function Application() {
  const [currentUser, setCurrentUser] = useState(null);

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
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <BrowserRouter>
            <Route path="/" component={Nav} />
            <Route path="/user" component={User} />
            <Route path="/search" component={Search} />
            <Route path="/messages" component={Messages} />
            <Route path="/settings" component={UserSettings} />
            <Route path="/post/add" component={AddPost} />
            <Route exact path="/" component={Home} />
          </BrowserRouter>
        </UserContext.Provider>
      </section>
    );
  } else {
    return (
      <UserContext.Provider value={{ currentUser }}>
        <Splash />
      </UserContext.Provider>
    );
  }
}
