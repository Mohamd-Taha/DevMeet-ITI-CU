import React, { useState }  from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';


const Comments = ({ message, firstName, lastName, userPicturePath }) => { 

    
    return (
        <>  
        <List sx={{ width: '100%', maxWidth: '97%',}}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar src={`http://localhost:7400/images/${userPicturePath}`}//de img al user ale by3ml comment bnfso  ex.(user.img)  
                    />   
                </ListItemAvatar>
                <ListItemText primary={firstName+" "+lastName}   // al asm da mn l user ale by3ml comment bnfso ex.(user.name)
                    secondary={
                        <React.Fragment>
                            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary" > { message } </Typography> 
                        </React.Fragment>
                    }
                />
                
                {/* {   && } */}
                <IconButton >
                    <HighlightOffIcon htmlColor='#F25268' fontSize='small' /*onClick={DeleteMyComment} */  />
                </IconButton>

            </ListItem>   
        <Divider variant="inset" component="li" style={{listStyle:'none'}}/>  
        </List>  
        </>
    );
};

export default Comments;
