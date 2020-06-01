import React from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "./Search";
import {
  AiOutlinePlusCircle,
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
      <Link to="/post">
        <AiOutlinePlusCircle />
      </Link>
      {/* <SearchBar /> */}
      <RightNav />
    </section>
  );
}

function RightNav() {
  return (
    <section id="RightNav">
      <Link to="/">
        <AiOutlineHome />
      </Link>
      <button style={{ backgroundColor: "transparent" }}>
        <AiOutlineHeart />
      </button>
      <Link to="/messages">
        <AiOutlineMessage />
      </Link>
      <UserBubble />
    </section>
  );
}
