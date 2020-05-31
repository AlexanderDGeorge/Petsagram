import React, { useState, createContext, useEffect } from "react";
import Nav from "./Nav";
import Splash from "./Splash";
import { auth } from "../firebase";

export const UserContext = createContext(null);

export default function Application() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => setUser(user));
  }, []);

  if (user) {
    return (
      <section id="Application">
        <UserContext.Provider value={{ user, setUser }}>
          <Nav />
        </UserContext.Provider>
      </section>
    );
  } else {
    return <Splash />;
  }
}
