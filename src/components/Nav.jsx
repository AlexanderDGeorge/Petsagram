import React from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "./Search";
import {
  AiOutlineHome,
  AiOutlineHeart,
  AiOutlineMessage,
} from "react-icons/ai";
import { UserBubble } from "./User";

export default function Nav() {
  return (
    <section id="Nav">
      <h1>Pet Feed</h1>
      <SearchBar />
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
