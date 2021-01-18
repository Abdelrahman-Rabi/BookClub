import React from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Library from "./components/library/Library";

const App = () => {
  return (
    <div>
      <Register />
      <Login />
      <Library />
    </div>
  );
};
export default App;
