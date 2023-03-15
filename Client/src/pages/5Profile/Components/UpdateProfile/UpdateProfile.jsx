import React from 'react'
import { Alert, Box, Button, Card, CardActions, CardContent, Container, Divider, FormControl, FormGroup, FormHelperText, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useAuthContext } from "../../../../hooks/useAuthContext";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { useNavigate } from "react-router-dom";
import "./UpdateProfile.css"
import axios from 'axios';

function UpdateProfile() {
 let { user, dispatch } = useAuthContext()
 const navigate = useNavigate();
 user = user.user
 Object.freeze(user)
 const [profileImage, setProfileImage] = useState(user?.profilePicture)
 console.log(profileImage)
 const [coverImage, setCoverImage] = useState(user?.coverPicture)
 const [description, setDescription] = useState(user?.desc)
 const [firstName, setFirstName] = useState(user?.firstName)
 const [lastName, setLastName] = useState(user?.lastName)
 const [location, setLocation] = useState(user?.city)
 const [occupation, setOccupation] = useState(user?.career)
 const [success, setSuccess] = useState()
console.log(user)

const handleSubmit = (event)=>{
event.preventDefault()
setSuccess(null)
const formData = new FormData()
 formData.append("image1", profileImage)
 formData.append("image2", coverImage)
 formData.append("desc", description)
 formData.append("firstName", firstName)
 formData.append("lastName", lastName)
 formData.append("city", location)
 formData.append("career", occupation)
  axios.put(`http://localhost:7400/user/${user._id}`, formData, { withCredentials: true, })

        .then((response) => {
          console.log(response)
          return response
        })
        .then(({ data }) => {
          localStorage.setItem('user', JSON.stringify(data))
          dispatch({ type: "Update", payload: data })
          console.log("done :D")
          setSuccess("update success!")

        })
        .catch((err) => { console.log(err) })
}
  return (
     <section style={{marginTop:"2em"}}>
      <Container maxWidth="md">
        <Card sx={{boxShadow:1, maxWidth: 'md'}}>
          <CardContent>
            <Container maxWidth="sm">
              <Typography variant="h2" color="text.primary" gutterBottom>
                Update Profile
              </Typography>
                {/* <Alert severity="error" aria-live="assertive">
                </Alert> */}
              <form onSubmit={handleSubmit}>
                <FormGroup row={true} id="email-group" sx={{marginTop: "1em"}}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="Description" id="email-confirmation-label">Description</InputLabel>
                    <Input id="Description" type="text" style={{marginTop:"20px"}} value={description} onChange={(e) => { setDescription(e.target.value) }} />
                    <FormHelperText id="Occupation">Enter new Description?</FormHelperText>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="firstNameUpdate" id="email-label">First Name</InputLabel>
                    <Input id="firstNameUpdate" type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                    <FormHelperText id="email-helper-text">Enter new first name?</FormHelperText>
                  </FormControl>
                </FormGroup>
                <FormGroup row={true} id="email-confirmation-group" >
                  <FormControl fullWidth>
                    <InputLabel htmlFor="lastNameUpdate" id="email-confirmation-label">Last Name</InputLabel>
                    <Input id="e-confirmation" type="text" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                    <FormHelperText id="lastNameUpdate">Enter new last name?</FormHelperText>
                  </FormControl>
                </FormGroup>
                 <FormGroup row={true} id="email-confirmation-group" >
                  <FormControl fullWidth>
                    <InputLabel htmlFor="location" id="email-confirmation-label">Location</InputLabel>
                    <Input id="location" type="text" value={location} onChange={(e) => { setLocation(e.target.value) }} />
                    <FormHelperText id="email-confirmation-helper-text">Enter new Location?</FormHelperText>
                  </FormControl>
                   <FormControl fullWidth>
                    <InputLabel htmlFor="Occupation" id="email-confirmation-label">Occupation</InputLabel>
                    <Input id="Occupation" type="text" value={occupation} onChange={(e) => { setOccupation(e.target.value) }} />
                    <FormHelperText id="Occupation">Enter new Occupation?</FormHelperText>
                  </FormControl>
                   <FormControl fullWidth>
                    <IconButton color="primary" aria-label="upload picture" component="label">
                    <PermMediaIcon htmlColor='tomato' className='ProfileIcon' />
                       <input hidden type="file" name="image1" accept="image/png, image/jpeg" onChange={(e) => {
                         let file = e.target.files[0];
                         console.log(file)
                              if (file) {
                               setProfileImage(file);
                                               } 
                         }} />
              </IconButton>
                    <FormHelperText style={{textAlign:"center"}} id="Occupation">Enter new Profile Picture?</FormHelperText>
                  </FormControl>
                   <FormControl fullWidth>
                    <IconButton color="primary" aria-label="upload picture" component="label">
                    <PermMediaIcon htmlColor='tomato' className='ProfileIcon' />
                       <input hidden type="file" name="image2" accept="image/png, image/jpeg" onChange={(e) => {  
                        let file = e.target.files[0];
                              if (file) {
                               setCoverImage(file);
                                               }}} />
              </IconButton>
                    <FormHelperText style={{textAlign:"center"}} id="Occupation">Enter new Cover Picture?</FormHelperText>
                  </FormControl>
                </FormGroup>
                <FormGroup row={true} id="submit-group" sx={{marginTop: "1em"}}>
                  <FormControl fullWidth>
                    <Button 
                      // disabled={} 
                      variant="contained" 
                      color="primary" 
                      type="submit" 
                      id="submit-button">Save Changes</Button>
                    { success && <div className='successDiv'>{success}</div>}
                  </FormControl>
                </FormGroup>
              </form>
            </Container>
          </CardContent>
        </Card>
      </Container>

    </section>
  )
}

export default UpdateProfile
