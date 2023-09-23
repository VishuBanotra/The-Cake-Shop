import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader";

const Feedback = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          "https://testingapp-mx0n.onrender.com/api/v1/admin/contact",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setMessages(response.data.messages);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <section className="feedbackClass">
      <main>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email-Id</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message, index) => (
                <tr key={index}>
                  <td>{message.name}</td>
                  <td>{message.email}</td>
                  <td>{message.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </section>
  );
};

export default Feedback;
