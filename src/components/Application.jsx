import React, { useState, createContext } from "react";
import Nav from "./Nav";
import Splash from "./Splash";

export const UserContext = createContext(null);

export default function Application() {
  const [user, setUser] = useState(null);

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
