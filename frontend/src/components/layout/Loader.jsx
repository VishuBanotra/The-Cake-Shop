import React from "react";
import { GiCupcake } from "react-icons/gi";
import { motion } from "framer-motion";

const Loader = () => {
  const options = {
    initial: {
      opacity: 0,
    },
    animate: { 
      opacity: "" 
    },
    transition: { 
      ease: "linear", 
      repeat: "Infinity", 
      repeatType: "reverse" 
    },
  };

  return (
    <motion.div className="loader">
      <GiCupcake />

      <motion.div>
        <motion.p {...options}>Loading...</motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
