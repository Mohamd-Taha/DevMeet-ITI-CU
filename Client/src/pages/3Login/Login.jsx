import React from "react";

import Headercomponents from "./headercomponents";
import Footercomponents from "./footercomponents";
import Logincomponents from "./logincomponents";
import Footer from '../../Components/Footer';



function Login() {
    return (
    <>
        <Headercomponents></Headercomponents> 
        <Logincomponents></Logincomponents>
        <Footercomponents></Footercomponents>
        <Footer/>
    </>
    );
}
export default Login;