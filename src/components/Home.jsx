import React, { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Pet Feed";
  }, []);
  return <section id="Home"></section>;
}
