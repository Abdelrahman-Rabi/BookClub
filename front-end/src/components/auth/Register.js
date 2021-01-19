import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import validate from "./handleErrorRegister";
import UserContext from "../context/UserContext";

const Register = (props) => {
  const [values, setValues] = useState({
    displayName: "",
    username: "",
    email: "",
    password: "",
    password2: "",
    role: "",
  });
  const history = useHistory();
  const { setUserData } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validate(values));
    if (Object.keys(errors).length) {
      console.log("need more data");
    } else {
      try {
        await axios
          .post("http://localhost:5000/register", values)
          .catch((err) => {
            console.log("ERR : ", err);
          });

        const loginRes = await axios.post("http://localhost:5000/login", {
          user: values.email,
          password: values.password,
        });
        setUserData({
          token: loginRes.data.token,
          name: loginRes.data.name,
        });

        localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/");
      } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h1>Register User</h1>
      <section>
        <label>Display Name</label>
        <input
          type="text"
          name="displayName"
          placeholder="enter your Display Name"
          value={values.displayName}
          onChange={handleChange}
        ></input>
        {/* {errors.username && <p className="input-error"> {errors.username} </p>} */}
      </section>
      <section>
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="enter your username"
          value={values.username}
          onChange={handleChange}
        ></input>
        {errors.username && <p className="input-error"> {errors.username} </p>}
      </section>
      <section>
        <label>Email </label>
        <input
          type="email"
          name="email"
          placeholder="enter your email"
          value={values.email}
          onChange={handleChange}
        ></input>
        {errors.email && <p className="input-error"> {errors.email} </p>}
      </section>
      <section>
        <label>Password </label>
        <input
          type="password"
          name="password"
          placeholder="enter password"
          value={values.password}
          onChange={handleChange}
        ></input>
        {errors.password && <p className="input-error"> {errors.password} </p>}
      </section>
      <section>
        <label>Confirm Password </label>
        <input
          type="password"
          name="password2"
          placeholder="confirm password"
          value={values.password2}
          onChange={handleChange}
        ></input>
        {errors.password2 && (
          <p className="input-error"> {errors.password2} </p>
        )}
      </section>
      <section>
        <label>role </label>
        <input
          type="text"
          name="role"
          value={values.role}
          onChange={handleChange}
        ></input>
      </section>
      <button type="submit" className="btn">
        Register
      </button>
    </form>
  );
};

export default Register;
