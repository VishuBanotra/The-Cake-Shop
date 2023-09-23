import React from "react";
import { GiCupcake } from "react-icons/gi";
import { FiShoppingCart, FiLogIn } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Header = ({ isUserAuthenticated }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <nav>
      <motion.div
        className="logo"
        initial={{ x: "-100%" }}
        whileInView={{ x: 0 }}
      >
        <Link to="/">
          <GiCupcake />
        </Link>
        <h4>The Cake Shop</h4>
      </motion.div>
      <div>
        <Link className="underline" to="/">
          Home
        </Link>
        {user?.role === "user" && (
          <Link className="underline" to="/contact">
            Contact
          </Link>
        )}
        {user?.role === "admin" && (
          <Link className="underline" to="/feedback">
            Feedback
          </Link>
        )}

        <Link className="underline" to="/about">
          About
        </Link>
        {user?.role === "user" && (
          <Link className="svg-icon" to="/cart">
            <FiShoppingCart />
          </Link>
        )}
        <Link className="svg-icon" to={isUserAuthenticated ? "/me" : "/login"}>
          {isUserAuthenticated ? <FaUser /> : <FiLogIn />}
        </Link>
      </div>
    </nav>
  );
};

export default Header;
