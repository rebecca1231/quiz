import React, { useState } from "react";
import Head from "./components/head";
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
const ID = process.env.REACT_APP_ID;
init(ID);

const About = () => {
  const [sent, setSent] = useState(false);

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm("service_ts0cbib", "template_ymcpv5c", e.target, ID).then(
      (result) => {
        console.log(result.text);
        setSent(true);
      },
      (error) => {
        console.log(error.text);
      }
    );
  }
  return (
    <div>
      <Head title="About" />
      <h1>About This Application</h1>
      <p>This is a simple quiz app!</p>
      <p>It's a work in progress, and I'm still adding features.</p>
      <p>Stay tuned!</p>

      <div style={{ marginTop: "2rem" }}>
        <div className="ui container">
          {sent === false ? (
            <>
              <h3>Issues, thoughts, comments?</h3>
              <h4>Get in Touch</h4>
              <form className="ui form" onSubmit={sendEmail}>
                <input type="hidden" name="contact_number" />
                <div className="field">
                  <label>Name</label>
                  <input
                    required
                    type="text"
                    name="user_name"
                    placeholder="First Last"
                  />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input
                    required
                    className="field"
                    type="email"
                    name="user_email"
                    placeholder="email@example.com"
                    style={{ padding: "5px" }}
                  />
                </div>
                <div className="field">
                  <label>Message</label>

                  <textarea
                    required
                    className="field"
                    name="message"
                    placeholder="Write your message here."
                  />
                </div>
                <div className="field">
                  <input
                    className="ui button teal"
                    type="submit"
                    value="Send"
                  />
                </div>
              </form>
            </>
          ) : (
            <div style={{ marginTop: "2rem" }}>
              <h3>Thank you!</h3>
              <p>Your message has been sent!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
