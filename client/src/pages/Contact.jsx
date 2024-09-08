import React from "react";
import '../styles/Contact.css'

const Contact = () => {

      return (
      <div className="ContactForm">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="contactForm">
                <h1 className="pb-4 fw-bolder">CONTACT ME</h1>
                <form id="contact-form">
                  <div className="row formRow">
                    <div className="col-6">
                      <input
                        type="text"
                        name="name"
                        className="form-control formInput"
                        placeholder="Name"
                      ></input>
                    </div>
                    <div className="col-6">
                      <input
                        type="email"
                        name="email"
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
                        className="form-control formInput"
                        placeholder="Subject"
                      ></input>
                    </div>
                  </div>
                  <div className="row formRow">
                    <div className="col">
                      <textarea
                        rows={3}
                        name="message"
                        className="form-control formInput"
                        placeholder="Message"
                      ></textarea>
                    </div>
                  </div>

                  <button
                    className="submit-btn btn btn-primary"
                    type="submit"
                  >
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
