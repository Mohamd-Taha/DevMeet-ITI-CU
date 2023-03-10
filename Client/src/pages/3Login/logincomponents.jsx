import classes from "./login.module.css"
import React, { useRef, useEffect, useState } from 'react';
import { useAuthContext } from "../../hooks/useAuthContext";
import Maincomponents from './maincomponents';

function Logincomponents(props) {
  let [email, setEmail] = useState('')
  let [password, setPassWord] = useState('')
  let [error, setError] = useState('')
  let { dispatch } = useAuthContext()


  const LoginServer = async () => {
    setError(null)
    console.log("hi")
    const res = await fetch('http://localhost:7400/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true, credentials: 'include'
    });
    console.log(res)
    const data = await res.json();
    if (!res.ok) {setError(data.error)}
    if (res.ok) { // save the user to local storage
      localStorage.setItem('user', JSON.stringify(data))
      dispatch({ type: "LOGIN", payload: data })
    }
  }
  return (
    <>
      <div className={classes.parent}>
        <div className={classes.bodysize}>
          <Maincomponents></Maincomponents>
        </div>
        <div className={classes.bodysize}>
          <div className={classes.style}> 
            <img src="images/logo.jpeg" alt="logo" width="200" height="200" />
            <br />
            <h2 className={classes.myfont}>sign in</h2>
            <br />
            <input className={classes.input} type="text" placeholder="email" onChange={(e) => { setEmail(e.target.value) }} />
            <br />
            <input className={classes.input} type="text" placeholder="password" onChange={(e) => { setPassWord(e.target.value) }} />
            <br />
            <button className={classes.btn} onClick={LoginServer}>sign in</button>
            {error && <div className="error">{error}</div>}
            <div><img src="" alt="" />
              <a href=""></a></div>
            <div className={classes.sign}><img src="images/googleimg.png" alt="google" width="30" height="30" />
              <a href="">continue with google</a></div>
            <div className={classes.sign}><img src="images/facebookimg.png" alt="facebook" width="30" height="30" />
              <a href="">containue wth facebook</a> </div>
            <button className={classes.btn}>regesiter</button></div>
        </div>
      </div>
    </>
  );
}

export default Logincomponents;