import React from 'react';
import classes from "./login.module.css"
function Maincomponents(props) {
    return (
        <div className={classes.mydiv2}>
            <h3 className={classes.myfont} >Make the most of your professinal life</h3>
            <h5 className={classes.myfont}>create the account and stay connected</h5>
           <img className={classes.myimg}src="images/loginmain.jpeg" alt="mainlogin" /> 
        </div>
    );
}

export default Maincomponents;