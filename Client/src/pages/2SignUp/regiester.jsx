import classes from "./login.module.css"
import React from 'react';

function Regester() {

    return (
        <div className={classes.style}>
            <form action="">
            <h2 className={classes.myfont} >sign up</h2>
            <br />
            <input className={classes.input} type="text" placeholder="FristName"/>
            <input className={classes.input} type="text" placeholder="LastName"/>
            <br />
            <input className={classes.input}type="text" placeholder="Email"/>
            <input className={classes.input}type="text" placeholder="Tittle"/>
            <br />
            <input className={classes.input}type="text" placeholder="Password"/>
            <br />
            <input className={classes.input}type="text" placeholder="Confirm Password"/>
            <br />
            <input type="submit" value="Sign up" className={classes.btn}/>
        
            <div className={classes.sign }><img src="images/googleimg.png" alt="google" width="30" height="30"/>
            <a href="">sign up with google</a></div>
            <div className={classes.sign}><img src="images/facebookimg.png" alt="facebook"width="30" height="30" />
            <a href="">sign up wth facebook</a> </div>
            </form>
        </div>
       
        
    );
}

export default Regester;