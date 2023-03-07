import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import NavBar from './NavBar';

const Error404 = () => {

    return (
        <div> 
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    backgroundColor: "#7301ae",
                }}
            >
                <Typography variant="h1" style={{ color: 'white' }}>
                    Erorr404
                </Typography>
                <Typography variant="h6" style={{ color: 'white' }}>
                    The page you’re looking for doesn’t exist.
                </Typography>
                <Button variant="contained" >Back Home</Button>
            </Box>
        </div>
    );
};

export default Error404;




