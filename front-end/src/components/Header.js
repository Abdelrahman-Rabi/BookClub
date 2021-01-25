import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "./auth/AuthOptions";
import SearchContainer from "./library/SearchContainer";

const Nav = () => {
  return (
    <header>
      <Link to="/">
        <h1 className="title">Book Club</h1>
      </Link>
      <SearchContainer />
      <AuthOptions />
    </header>
  );
};

export default Nav;
