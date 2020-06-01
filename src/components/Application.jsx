import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { auth, getUserDoc } from "../firebase";
import Nav from "./Nav";
import Splash from "./Splash";
import Home from "./Home";
import Messages from "./Messages";
import { User } from "./User/User";
import UserSettings from "./User/UserSettings";
import AddPost from "./Post/AddPost";

export const UserContext = createContext(null);

export default function Application() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      const userDoc = await getUserDoc(user.uid);
      setUser(userDoc);
    });
  }, []);

  window.user = user;

  if (auth.currentUser) {
    return (
      <section id="Application">
        <UserContext.Provider value={{ user }}>
          <BrowserRouter>
            <Route path="/" component={Nav} />
            <Route path="/user" component={User} />
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
      <UserContext.Provider value={{ user }}>
        <Splash />
      </UserContext.Provider>
    );
  }
}
