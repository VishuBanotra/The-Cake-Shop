import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../redux/store.js";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const loginHanlder = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${server}/register`,
        {
          name: name,
          username: userName,
          role: role,
          password: userPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    navigate("/login");
  };

  return (
    <section className="signup">
      <form onSubmit={loginHanlder}>
        <h2>The Cake Shop</h2>
        <br />
        <br />

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter your E-mail"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <div className="role-cont">
          <p>Register as</p>
          <div>
            <label>Admin</label>
            <input
              type="radio"
              name="role"
              onChange={() => setRole("admin")}
              required
            />
          </div>
          <div>
            <label>User</label>
            <input type="radio" name="role" onChange={() => setRole("user")} />
          </div>
        </div>

        <button type="submit">Sign Up</button>
        <br />
        <div>
          <span>Already a member ?</span>
          <Link to="/login">Click Here !</Link>
        </div>
      </form>
    </section>
  );
};

export default Signup;
