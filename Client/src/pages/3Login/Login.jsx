// import * as React from 'react'; 
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PlainNav from '../../Components/PlainNav'
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import React, { useRef, useEffect, useState } from 'react';
import { useAuthContext } from "../../hooks/useAuthContext";




const Login = () => {

let [t,i18n]= useTranslation();

    let [email, setEmail] = useState('')
    let [password, setPassWord] = useState('')
    let [error, setError] = useState('')
    let { dispatch } = useAuthContext()


    const LoginServer = async (e) => {
        e.preventDefault()
        console.log("inside login")
        setError(null) 
        const res = await fetch('http://localhost:7400/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true, credentials: 'include'
        });
        console.log(res)
        const data = await res.json();
        console.log(data)
        if (!res.ok) { 
            console.log("inside res isnt")
            setError(data.error) }
        if (res.ok) { // save the user to local storage
            console.log("res is ok")
            localStorage.setItem('user', JSON.stringify(data))
            dispatch({ type: "LOGIN", payload: data })
        }
    }

    return (
        <div>
            <PlainNav></PlainNav>
            <Grid container component="main" sx={{ height: '100vh' }} >
                <Grid item xs={false} sm={2} md={7} sx={{ backgroundImage: `url(${'/assets/PurpleImg.jpg'})`, backgroundSize: 'cover' }}>
                    <Typography variant="h2" style={{ position: 'absolute', color: 'whitesmoke', top: '30%', left: '40%', transform: 'translate(-70%, -20%)', fontWeight: '900', fontFamily: 'raleway' , width:"50%"  }}>
                        {t("Make the most of your professinal life")}
                    </Typography>
                    <Typography variant="h4" style={{ position: 'absolute', color: 'white', top: '50%', left: '40%', transform: 'translate(-55%, -20%)', fontWeight: '650', fontFamily: 'raleway' }}>
                        {t("Login and stay connected")}
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={20} square style={{ marginTop: '40px', backgroundColor: '#f0e8ff' }} >
                    <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                        <img src="/assets/SiteLogo.png" height={100} />
                        <h2 style={{ color: 'purple', fontWeight: '900', fontFamily: 'raleway' }}>{t("Login")}</h2>
                        <Box component="form" sx={{ mt: 2 }} >

                            <TextField margin="normal" required fullWidth id="email" label={t("Email Address")} name="email" autoComplete="email" autoFocus onChange={(e) => { setEmail(e.target.value) }} />
                            <TextField margin="normal" required fullWidth name="password" label={t("Password")} type="password" id="password" onChange={(e) => { setPassWord(e.target.value) }} />
                            <Box textAlign='center'>
                                <Button type="submit" variant="contained" style={{ backgroundColor: 'purple', width: '60%', fontWeight: 'bold', fontSize: '13pt' }} sx={{ mt: 3, mb: 2 }} onClick={LoginServer} >{ t("Login") } </Button>
                                {error && <div style={{color:'red'}}>{error}</div>}
                            </Box>
                            <Grid container>
                                {/* <Grid item xs>
                                    <Link href="#" variant="body2" style={{color:'purple'}} > Forgot password? </Link>
                                </Grid> */}
                                <Grid item>
                                    <NavLink to={"/register"} variant="body2" style={{ color: 'purple' }}> {t("Don't have an account? Register")}  
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <div>
                        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 20 }} > {'Copyright © '}
                            <Link color="inherit" href="http://localhost:3000/"> DevMeet </Link> {new Date().getFullYear()}
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Login;
