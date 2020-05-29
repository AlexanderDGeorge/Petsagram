import React from "react";
import { SearchBar } from "./Search";
import { AiFillHome, AiFillHeart } from "react-icons/ai";

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
      <AiFillHome />
      <AiFillHeart />
    </section>
  );
}
