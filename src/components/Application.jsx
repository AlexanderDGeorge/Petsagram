import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { auth } from "../firebase";
import Nav from "./Nav";
import Splash from "./Splash";
import Home from "./Home";
import Messages from "./Messages";
import { User } from "./User";

export const UserContext = createContext(null);

export default function Application() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => setUser(user));
  }, []);

  window.user = user;

  if (user) {
    return (
      <section id="Application">
        <UserContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <Route path="/" component={Nav} />
            <Route path="/user" component={User} />
            <Route path="/messages" component={Messages} />
            <Route exact path="/" component={Home} />
          </BrowserRouter>
        </UserContext.Provider>
      </section>
    );
  } else {
    return <Splash />;
  }
}
