import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import UserContext from "../context/UserContext";

const Login = () => {
  const [values, setValues] = useState({
    user: "",
    password: "",
  });

  const [error, setError] = useState();
  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await axios.post("http://localhost:5000/login", values);
      const decoded = jwt_decode(loginRes.data.token);
      console.log(loginRes.data.name);
      setUserData({ token: loginRes.data.token, name: loginRes.data.name });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <section>
        <label>Email or username</label>
        <br />
        <input
          type="text"
          name="user"
          placeholder="Enter your Email or username"
          value={values.user}
          onChange={handleChange}
        ></input>
      </section>
      <br />
      <section>
        <label>Password </label>
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          value={values.password}
          onChange={handleChange}
        ></input>
      </section>
      <br />
      <button type="submit">Sign in</button>
    </form>
  );
};

export default Login;
