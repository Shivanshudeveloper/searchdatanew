import { auth } from "../firebase/index";
import React, { useState, useEffect } from "react";

const Logo = (props) => {
  const [photo, setPhoto] = useState("");
  auth.onAuthStateChanged((user) => {
    if (user) {
      setPhoto(user.photoURL);
    }
  });

  return (
    <img alt="Logo" src={photo || "/static/logo.svg"} {...props} width="40" />
  );
};

export default Logo;
