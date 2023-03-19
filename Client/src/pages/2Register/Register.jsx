import * as React from 'react';
import Button from '@mui/material/Button'; 
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'; 
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './Register.css'
import PlainNav from '../../Components/PlainNav'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const Register =  () => {
    let [t,i18n]= useTranslation();
    const [firstName, setFirstName]=useState()
    const [lastName, setLastName]=useState()
    const [email, setEmail]=useState()
    const [password, setPassword]=useState()
    const [password2, setPassword2]=useState()
    const [error, setError]=useState()
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null)
        if(password !== password2){
            setError("Passwords don't match")
        }
        else{
      const res = await fetch('http://localhost:7400/register', {
      method: 'POST',
      body: JSON.stringify({firstName, lastName, email, password }),
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true, credentials: 'include'
    });
    console.log(res)
    const data = await res.json();
    if (!res.ok) {setError(data.error)}
    if (res.ok) { 
      navigate('/login')
    }
        }
    };

    return (
      <>
      <div className="theNav">
        <PlainNav ></PlainNav>
      </div>
      <div className='FormContainer'>
        <Container component="main" maxWidth="xs"> 
            <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                <img src="/assets/SiteLogo.png" height={100}/>
                <h2 style={{ color: 'purple' , fontWeight:'900' , fontFamily:'raleway'}}>{t("Register")}</h2>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField required fullWidth size="small" id="firstName" label={t("First Name")} autoFocus name="firstName" autoComplete="given-name" onChange={(e)=>{setFirstName(e.target.value)}} />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField required fullWidth size="small" id="lastName" label={t("Last Name")} name="lastName" autoComplete="family-name" onChange={(e)=>{setLastName(e.target.value)}} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth size="small" id="email" label={t("Email Address")} name="email" autoComplete="email"  type="email" onChange={(e)=>{setEmail(e.target.value)}} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth size="small" id="password" label={t("Password")} name="password"  type="password"  onChange={(e)=>{setPassword(e.target.value)}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth size="small" id="ConfirmPassword" label={t("Confirm Password")} name="ConfirmPassword" type="password"  onChange={(e)=>{setPassword2(e.target.value)}} />
                        </Grid>
                       {error && <div className='error'>
                             {error}
                        </div>}
                    </Grid>
                    <Box textAlign='center'>
                        <Button type="submit"  variant="contained" style={{ backgroundColor: 'purple', width:'60%' , fontWeight:'bold', fontSize:'13pt'}} sx={{ mt: 3, mb: 2 }}>{t("Register")} </Button>
                    </Box>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <NavLink to="/login" variant="body2" style={{color:'purple'}}> {t("Already have an account? Login")} </NavLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            
        </Container>
    </div> 
    <div>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }} > {'Copyright © '}
        <Link color="inherit" href="http://localhost:3000/"> DevMeet </Link>{' '} {new Date().getFullYear()}
      </Typography> 
    </div>
    </>
    );
}

export default Register;



