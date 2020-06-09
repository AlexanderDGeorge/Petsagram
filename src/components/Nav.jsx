import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AiFillPlusCircle,
  AiOutlinePlusCircle,
  AiOutlineSearch,
  AiFillHome,
  AiOutlineHome,
  AiFillMessage,
  AiOutlineMessage,
} from "react-icons/ai";
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
  const pathname = useLocation().pathname;
  return (
    <section id="NavItems">
      <div className="NavItem">
        <Link to="/">
          {pathname === "/" ? <AiFillHome /> : <AiOutlineHome />}
        </Link>
      </div>
      <div className="NavItem">
        <Link to="/search">
          <AiOutlineSearch
            style={pathname === "/search" ? { strokeWidth: 50 } : {}}
          />
        </Link>
      </div>
      <div className="NavItem">
        <Link to="/post/add">
          {pathname === "/post/add" ? (
            <AiFillPlusCircle />
          ) : (
            <AiOutlinePlusCircle />
          )}
        </Link>
      </div>
      {/* <div className="NavItem">
        <button style={{ backgroundColor: "transparent" }}>
          <AiOutlineHeart />
        </button>
      </div> */}
      <div className="NavItem">
        <Link to="/messages">
          {pathname === "/messages" ? <AiFillMessage /> : <AiOutlineMessage />}
        </Link>
      </div>
      <div className="NavItem">
        <Link to={`/user/${currentUser.username}`}>
          <img src={currentUser.photoURL} alt="" />
        </Link>
      </div>
    </section>
  );
}
