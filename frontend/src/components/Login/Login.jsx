import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loadUser, login } from "../../redux/actions/userAction";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const loginHanlder = async (e) => {
    e.preventDefault();
    await dispatch(login(userName, userPassword));
    dispatch(loadUser());
    navigate("/");
  };

  return (
    <section className="login">
      <form onSubmit={loginHanlder}>
        <h2>The Cake Shop</h2>
        <br />
        {/* {error && <p>Username or Password is Incorrect</p>} */}
        <br />
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

        <button type="submit">Login</button>
        <br />
        <div>
          <span>New User?</span>
          <Link to="/signup">Click Here !</Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
