import React, { useState }  from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';



const Comments = ({ message }) => { 

    
    return (
        <>  
        <List sx={{ width: '100%', maxWidth: 500,   }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar src="/assets/persons/8.jpg" //de img al user ale by3ml comment bnfso  ex.(user.img)  
                    />   
                </ListItemAvatar>
                <ListItemText primary="Abdelrahman " // al asm da mn l user ale by3ml comment bnfso ex.(user.name)
                    secondary={
                        <React.Fragment>
                            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary" > { message } </Typography> 
                        </React.Fragment>
                    }
                />
            </ListItem>   
        <Divider variant="inset" component="li" style={{listStyle:'none'}}/>  
        </List>  
        </>
    );
};

export default Comments;
