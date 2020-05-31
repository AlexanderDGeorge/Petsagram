import React, { useContext, useState } from "react";
import { UserContext } from "./Application";
import { Link } from "react-router-dom";
import Nav from "./Nav";

export function User() {
  return (
    <section id="User">
      <Nav />
    </section>
  );
}

export function UserBubble() {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  console.log(user);

  return (
    <Link to="/user" id="UserBubble">
      <img
        id="UserPhoto"
        src={user.photoURL}
        alt=""
        onClick={() => setOpen(!open)}
      />
    </Link>
  );
}

function UserHeader() {
  const { user } = useContext(UserContext);

  return <header id="UserHeader"></header>;
}

function UserMenu({ open, setOpen }) {
  return <div className="Modal"></div>;
}
