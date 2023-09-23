import React, { useState } from "react";
import { motion } from "framer-motion";
import cake from "../../assets/cake.png";
import axios from "axios";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://testingapp-mx0n.onrender.com/api/v1/contact",
        {
          name,
          email,
          message,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setName("");
      setEmail("");
      setMessage("");
      alert("Message sent successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="contact">
      <motion.form
        initial={{
          x: "-100vw",
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{ delay: 0.3 }}
        onSubmit={formHandler}
      >
        <h2>Contact Us</h2>
        <input
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          placeholder="Message"
          name="message"
          id=""
          cols="30"
          rows="10"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type="submit">Send</button>
      </motion.form>

      <motion.div
        className="formBorder"
        initial={{
          x: "100vw",
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          initial={{
            x: "50%",
            y: "-100vh",
            opacity: 0,
          }}
          animate={{
            x: "50%",
            y: "-50%",
            opacity: 1,
          }}
          transition={{ delay: 0.5 }}
        >
          <img src={cake} alt="cake" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
