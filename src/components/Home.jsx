import React, { useEffect, useState, useContext } from "react";
import { getPostFeed } from "../firebase";
import { UserContext } from "./Application";
import Post from "./Post/Post";

export default function Home() {
  const { currentUser } = useContext(UserContext);
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    document.title = "Pet Feed";
    (async function getFeed() {
      setFeed(await getPostFeed(currentUser));
    })();
  }, [currentUser]);

  if (feed) {
    return (
      <section id="Home" className="content">
        {feed.map((post, i) => (
          <Post post={post} key={i} />
        ))}
      </section>
    );
  } else return null;
}
