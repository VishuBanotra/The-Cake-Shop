import React from "react";
import { motion } from "framer-motion";

const MenuCard = ({ title, itemNum, burgerSrc, price, handler, delay = 0 }) => {
  return (
    <motion.div
      className="menu-card"
      initial={{
        x: "-100%",
        opacity: 0,
      }}
      whileInView={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        delay,
      }}
    >
      <div> {title}</div>
      <main>
        <img src={burgerSrc} alt={itemNum} />
        <h5>₹ {price}</h5>
        <button onClick={() => handler(itemNum)}>Add to Cart</button>
      </main>
    </motion.div>
  );
};

export default MenuCard;
