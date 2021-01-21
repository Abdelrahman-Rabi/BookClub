import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserContext from "./components/context/UserContext";
import Home from "./components/Home";
import Header from "./components/Header";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import BookPage from "./components/library/BookPage";

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    name: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({ token, name: userRes.data });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/book-page/:id" component={BookPage} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
};
export default App;
