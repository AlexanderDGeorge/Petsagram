import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlinePlusCircle,
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineMessage,
} from "react-icons/ai";
import { UserBubble } from "./User/UserExports";
import { UserContext } from "./Application";

export default function Nav() {
  if (window.innerWidth <= 600) {
    return (
      <section id="Nav">
        <NavItems />
      </section>
    );
  } else {
    return (
      <section id="Nav">
        <Link to="/" style={{ textDecoration: "none", fontSize: "1.5em" }}>
          Pet Feed
        </Link>
        <NavItems />
      </section>
    );
  }
}

function NavItems() {
  const { currentUser } = useContext(UserContext);
  return (
    <section id="NavItems">
      <div className="NavItem">
        <Link to="/">
          <AiOutlineHome />
        </Link>
      </div>
      <div className="NavItem">
        <Link to="/search">
          <AiOutlineSearch />
        </Link>
      </div>
      <div className="NavItem">
        <Link to="/post/add">
          <AiOutlinePlusCircle />
        </Link>
      </div>
      {/* <div className="NavItem">
        <button style={{ backgroundColor: "transparent" }}>
          <AiOutlineHeart />
        </button>
      </div> */}
      <div className="NavItem">
        <Link to="/messages">
          <AiOutlineMessage />
        </Link>
      </div>
      <div className="NavItem">
        <UserBubble user={currentUser} />
      </div>
    </section>
  );
}
