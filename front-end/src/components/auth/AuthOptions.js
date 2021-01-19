import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";

const AuthOptions = () => {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();
  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      name: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/");
  };
  return (
    <nav>
      {userData.token ? (
        <button onClick={logout}>Sign out</button>
      ) : (
        <>
          <button onClick={register}>Register</button>
          <button onClick={login}>Sign in</button>
        </>
      )}
    </nav>
  );
};

export default AuthOptions;
