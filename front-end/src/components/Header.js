import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "./auth/AuthOptions";

const Nav = () => {
  return (
    <header>
      <Link to="/">
        <h1 className="title">Book Club</h1>
      </Link>
      <AuthOptions />
    </header>
  );
};

export default Nav;
