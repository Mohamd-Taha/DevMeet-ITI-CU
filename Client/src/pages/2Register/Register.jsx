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

const Register = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({ email: data.get('email'), password: data.get('password'),  });
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
                <h2 style={{ color: 'purple' , fontWeight:'900' , fontFamily:'raleway'}}>Register</h2>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField required fullWidth size="small" id="firstName" label="First Name" autoFocus name="firstName" autoComplete="given-name" />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField required fullWidth size="small" id="lastName" label="Last Name" name="lastName" autoComplete="family-name" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth size="small" id="email" label="Email Address" name="email" autoComplete="email"  type="email" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth size="small" id="password" label="Password" name="password"  type="password" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth size="small" id="ConfirmPassword" label="ConfirmPassword" name="ConfirmPassword" type="password"  />
                        </Grid>
                    </Grid>
                    <Box textAlign='center'>
                        <Button type="submit"  variant="contained" style={{ backgroundColor: 'purple', width:'60%' , fontWeight:'bold', fontSize:'13pt'}} sx={{ mt: 3, mb: 2 }}> Register  </Button>
                    </Box>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2" style={{color:'purple'}}> Already have an account? Login </Link>
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



