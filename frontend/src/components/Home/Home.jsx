import React from "react";
import { motion } from "framer-motion";
import Founder from "./Founder";
import Menu from "./Menu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  const animation = {
    initial: { x: "-100%", opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
  };

  return (
    <>
      <section className="home">
        <div>
          <motion.h1 {...animation}>The Cake Shop</motion.h1>
          <motion.p {...animation} transition={{ delay: 0.2 }}>
            {user?.role === "admin"
              ? "FOR ADMINISTRATORS ONLY"
              : "From our oven to your table."}
          </motion.p>
        </div>

        {user?.role === "admin" ? (
          <Link to="/me">Go to Dashboard</Link>
        ) : (
          <motion.a
            href="#menu"
            initial={{ y: "-100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            EXPLORE NOW
          </motion.a>
        )}
      </section>
      <Founder />
      {user?.role !== "admin" && <Menu />}
    </>
  );
};

export default Home;
