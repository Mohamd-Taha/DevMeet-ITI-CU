import React from "react";

import Headercomponents from "./headercomponents";
import Footercomponents from "./footercomponents";
import Logincomponents from "./logincomponents";

function Login() {
    return (
    <>
        <Headercomponents></Headercomponents> 
        <Logincomponents></Logincomponents>
        <Footercomponents></Footercomponents>
    </>
    );
}
export default Login;