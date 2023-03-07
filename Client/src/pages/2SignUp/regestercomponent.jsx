import classes from "../3Login/login.module.css"
import { registerRoute } from "../utils/APIRoutes";
import axios from "axios";

import React, { useState, useEffect } from "react";
// import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function Regestercomponents(props) {
    const navigate = useNavigate();
    const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };
    const [values, setValues] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  
    useEffect(() => {
      if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/");
      }
    }, []);
  
    const handleChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
    };
  
    const handleValidation = () => {
      const { password, confirmPassword, username, email } = values;
      if (password !== confirmPassword) {
        toast.error(
          "Password and confirm password should be same.",
          toastOptions
        );
        return false;
      } else if (username.length < 3) {
        toast.error(
          "Username should be greater than 3 characters.",
          toastOptions
        );
        return false;
      } else if (password.length < 8) {
        toast.error(
          "Password should be equal or greater than 8 characters.",
          toastOptions
        );
        return false;
      } else if (email === "") {
        toast.error("Email is required.", toastOptions);
        return false;
      }
  
      return true;
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (handleValidation()) {
        const { email, username, password } = values;
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
        });
  
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(data.user)
          );
          navigate("/");
        }
      }
    };
    return (
        // <div className={classes.style}>
        //     <form action="">
        //     <h2 className={classes.myfont} >sign up</h2>
        //     <br />
        //     <input className={classes.input} type="text" placeholder="FristName"/>
        //     <input className={classes.input} type="text" placeholder="LastName"/>
        //     <br />
        //     <input className={classes.input}type="text" placeholder="Email"/>
        //     <input className={classes.input}type="text" placeholder="Tittle"/>
        //     <br />
        //     <input className={classes.input}type="text" placeholder="Password"/>
        //     <br />
        //     <input className={classes.input}type="text" placeholder="Confirm Password"/>
        //     <br />
        //     <input type="submit" value="Sign up" className={classes.btn}/>
        
        //     <div className={classes.sign }><img src="images/googleimg.png" alt="google" width="30" height="30"/>
        //     <a href="">sign up with google</a></div>
        //     <div className={classes.sign}><img src="images/facebookimg.png" alt="facebook"width="30" height="30" />
        //     <a href="">sign up wth facebook</a> </div>
        //     </form>
        // </div>
        <>
       
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src="images/logo.jpeg" alt="logo" />
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      
      <ToastContainer />
      </>
        
    );
}
// const FormContainer = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 1rem;
//   align-items: center;
//   background-color: #131324;
//   .brand {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     justify-content: center;
//     img {
//       height: 5rem;
//     }
//     h1 {
//       color: white;
//       text-transform: uppercase;
//     }
//   }

//   form {
//     display: flex;
//     flex-direction: column;
//     gap: 2rem;
//     background-color: #00000076;
//     border-radius: 2rem;
//     padding: 3rem 5rem;
//   }
//   input {
//     background-color: transparent;
//     padding: 1rem;
//     border: 0.1rem solid #4e0eff;
//     border-radius: 0.4rem;
//     color: white;
//     width: 100%;
//     font-size: 1rem;
//     &:focus {
//       border: 0.1rem solid #997af0;
//       outline: none;
//     }
//   }
//   button {
//     background-color: #4e0eff;
//     color: white;
//     padding: 1rem 2rem;
//     border: none;
//     font-weight: bold;
//     cursor: pointer;
//     border-radius: 0.4rem;
//     font-size: 1rem;
//     text-transform: uppercase;
//     &:hover {
//       background-color: #4e0eff;
//     }
//   }
//   span {
//     color: white;
//     text-transform: uppercase;
//     a {
//       color: #4e0eff;
//       text-decoration: none;
//       font-weight: bold;
//     }
//   }
// `;
export default Regestercomponents;