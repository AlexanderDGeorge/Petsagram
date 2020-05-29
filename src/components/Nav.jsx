import React from "react";
import { SearchBar } from "./Search";
import {
  AiOutlineHome,
  AiOutlineHeart,
  AiOutlineMessage,
} from "react-icons/ai";
import User from "./User";

export default function Nav() {
  return (
    <section id="Nav">
      <h1>Petsagram</h1>
      <SearchBar />
      <RightNav />
    </section>
  );
}

function RightNav() {
  return (
    <section id="RightNav">
      <AiOutlineHome />
      <AiOutlineHeart />
      <AiOutlineMessage />
      <User />
    </section>
  );
}
