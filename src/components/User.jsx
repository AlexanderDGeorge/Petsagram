import React, { useContext } from "react";
import { UserContext } from "./Application";

export default function User() {
  const { user } = useContext(UserContext);

  console.log(user);

  return <img id="User" src={user.photoURL} alt="" />;
}
