import { useState } from "react";

// import emailjs from "emailjs-com";
import React from "react";

const initialState = { name: "",  email: "", message: ""};

let Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e) => {
    console.log("handelsbmt");
    // e.preventDefault();
    // console.log(name, email, message);
    // emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", e.target, "YOUR_USER_ID")
    //   .then(
    //     (result) => {
    //       console.log(result.text);
    //       clearState();
    //     },
    //     (error) => {
    //       console.log(error.text);
    //     }
    //   );
  };
  return (
    <div>
      <div id="contact">
        <div className="Maincontainer">
          <div className="colMD8">
            <div className="myrow">
              <div className="section-title">
                <h2 className="font-h2" >Get In Touch</h2>
                <p className="parag"  > Please fill out the form below to send us an email and we will get back to you as soon as possible. </p>
              </div>
              <form name="sentMessage" validate="true" onSubmit={handleSubmit}>
                <div className="myrow">
                  <div className="colmd6">
                    <div className="form-group">
                      <input type="text" id="name" name="name" className="form-control" placeholder="Name" required onChange={handleChange} />
                      <p className="help-block   parag "></p>
                    </div>
                  </div>
                  <div className="colmd6">
                    <div className="form-group">
                      <input type="email" id="email" name="email" className="form-control" placeholder="Email" required onChange={handleChange} />
                      <p className="help-block text-danger parag "></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea name="message" id="message" className="form-control" rows="4" placeholder="Message" required onChange={handleChange} ></textarea>
                  <p className="help-block   parag "></p>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className="colmd3  colmdofst1 contact-info">
            <div className="contact-item">
              <h3 className="font-h3" >Contact Info</h3>
              <p className="parag"   >
                <span>
                  <i className="fa fa-map-marker"></i> Address
                </span>
                {props.data ? props.data.address : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p className="parag"  >
                <span>
                  <i className="fa fa-phone"></i> Phone
                </span> 
                {props.data ? props.data.phone : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p className="parag"  >
                <span>
                  <i className="fa fa-envelope"></i> Email
                </span> 
                {props.data ? props.data.email : "loading"}
              </p>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
};



export default Contact ;