import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import NavBar from './NavBar';
import { useAuthContext } from '../hooks/useAuthContext';
import { NavLink } from 'react-router-dom';

const Error404 = () => {

    const {user, dispatch, isLoading} = useAuthContext()


    return (
        <div> 
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: '100vh', backgroundColor: "#7301ae",}}>
                <Typography variant="h1" style={{ color: 'white' , fontWeight:'bolder' }}>
                    Erorr404
                </Typography>
                <Typography variant="h4" style={{ color: 'white' , fontFamily:'raleway'}}>
                    The page you're looking for doesn't exist
                </Typography>

                <NavLink to={`/`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" style={{ backgroundColor:'purple' , fontFamily:'raleway'  }}  >Back Home</Button>
                </NavLink>

            </Box>
        </div>
    );
};

export default Error404;




