import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({
    user: "",
    password: "",
  });

  const handleChange = (e) => {
    console.log(values);
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", values)
      .then((result) => {
        if (!result.data.error) {
          localStorage.setItem("token", result.data);
        }
      })
      .catch((err) => {
        console.log("ERR : ", err);
      });
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
