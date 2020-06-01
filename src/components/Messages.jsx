import React, { useEffect } from "react";

export default function Messages() {
  useEffect(() => {
    document.title = "Messages";
  }, []);
  return <section id="Messages"></section>;
}
