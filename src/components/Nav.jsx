import React from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "./Search";
import {
  AiOutlinePlusCircle,
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineHeart,
  AiOutlineMessage,
} from "react-icons/ai";
import { UserBubble } from "./User/User";

export default function Nav() {
  return (
    <section id="Nav">
      <Link to="/" style={{ textDecoration: "none", fontSize: "1.5em" }}>
        Pet Feed
      </Link>
      {window.innerWidth > 500 ? <SearchBar /> : null}
      <NavItems />
    </section>
  );
}

function NavItems() {
  return (
    <section id="NavItems">
      <div className="NavItem">
        <Link to="/">
          <AiOutlineHome />
        </Link>
      </div>
      {window.innerWidth <= 500 ? (
        <div className="NavItem">
          <button style={{ backgroundColor: "transparent" }}>
            <AiOutlineSearch />
          </button>
        </div>
      ) : null}
      <div className="NavItem">
        <Link to="/post/add">
          <AiOutlinePlusCircle />
        </Link>
      </div>
      <div className="NavItem">
        <button style={{ backgroundColor: "transparent" }}>
          <AiOutlineHeart />
        </button>
      </div>
      <div className="NavItem">
        <Link to="/messages">
          <AiOutlineMessage />
        </Link>
      </div>
      <div className="NavItem">
        <UserBubble />
      </div>
    </section>
  );
}
