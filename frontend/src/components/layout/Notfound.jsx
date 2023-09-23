import React from "react";
import { MdError } from "react-icons/md";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <section className="not-found">
      <main>
        <div>
            <MdError />
            <h1>ERROR 404</h1>
        </div>

        <p>Page not found, click below to goto home page.</p>
        <Link to="/">Go to Home</Link>
      </main>
    </section>
  );
};

export default Notfound;
