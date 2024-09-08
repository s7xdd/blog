import React, { useState } from "react";
import "../styles/Contact.css";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  const contactSubmit = (e) => {
    e.preventDefault();

    if (
      name.length < 1 ||
      email.length < 1 ||
      subject.length < 1 ||
      message.length < 1
    ) {
      alert("Please enter all fields");
    } else {
      const data = {
        name: name,
        email: email,
        subject: subject,
        message: message,
      };

      axios
        .put(`${import.meta.env.VITE_URL}/contactme`, data)
        .then((response) => {
          setRedirect(true)
          alert(response.data)
        }).catch((error) => {
          alert('Something went wrong. Please try again')
        })
    }
  };

  if(redirect){
    return (<Navigate to={'/'}/>)
  }

  return (
    <div className="ContactForm">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <div className="contactForm">
              <h1 className="pb-4 fw-bolder">CONTACT ME</h1>
              <form id="contact-form" onSubmit={contactSubmit}>
                <div className="row formRow">
                  <div className="col-6">
                    <input
                      type="text"
                      name="name"
                      onChange={e => setName(e.target.value)}
                      className="form-control formInput"
                      placeholder="Name"
                    ></input>
                  </div>
                  <div className="col-6">
                    <input
                      type="email"
                      name="email"
                      onChange={e => setEmail(e.target.value)}
                      className="form-control formInput"
                      placeholder="Email address"
                    ></input>
                  </div>
                </div>
                <div className="row formRow">
                  <div className="col">
                    <input
                      type="text"
                      name="subject"
                      onChange={e => setSubject(e.target.value)}
                      className="form-control formInput"
                      placeholder="Subject"
                    ></input>
                  </div>
                </div>
                <div className="row formRow">
                  <div className="col">
                    <textarea
                      rows={6}
                      name="message"
                      onChange={e => setMessage(e.target.value)}
                      className="form-control formInput"
                      placeholder="Message"
                    ></textarea>
                  </div>
                </div>

                <button className="submit-btn btn btn-primary" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
