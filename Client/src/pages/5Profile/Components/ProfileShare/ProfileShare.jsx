import React from 'react'
import "./ProfileShare.css"
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material"

import { useEffect, useState } from 'react';
// import { Room, EmojiEmotions } from "@mui/icons-material";
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import axios from 'axios';
import { useTranslation } from 'react-i18next'




///////////////////////////////////////////////////////////// 
const MenuProps = { PaperProps: { style: { maxHeight: 45 * 4.5, width: 250 } } };   // shakl l tag gwa al menu
//23ml fetch ll tags ale already 3ndna felwebsite, lw mm3ksh data 5od dol sbthom yb2o Tags 3ndna fel website al user y5tar mnhom lma ypost
const Tags = ['JavaScript', 'TypeScript', 'React', 'CSS', 'HTML', 'Angular', 'NodeJS', 'MongoDB', 'UXUI', 'PHP', 'Mysql', 'SQL', 'Database', 'Data Structure', 'C', 'C#', 'C++', 'Java', 'R', 'Python', 'DevOps', 'Data Analysis',
    'Frontend', 'Backend', 'ProblemSolving', 'React Native', 'Kotlin', 'Flutter', 'Cyber Security', 'VueJS', 'Algorithms']; // lw momkn ta5odhom mn hna (melFront) fa eshta fa dol kfaya awi
/////////////////////////////////////////////////////////////



const Share = ({ user, sendNewPost, personalCheck }) => {


     let [t,i18n]= useTranslation();
    const [description, setDescription] = useState()
    const [image, setImage] = useState()
    const [error, setError] = useState()
    const [TagName, setTagName] = useState([]);
    const [placeholder, setPlaceholder] = useState(`What's on your mind ${user.firstName}?`)

    const makePost = () => {
        setError(null)
        if (description) {
            console.log(TagName)
            const formData = new FormData()
            formData.append("userId", user._id)
            formData.append("description", description)
            formData.append("image1", image)
            formData.append("tags", TagName)
            formData.append('picturePath', user.profilePicture)
            // formData.append('communityId',communityId)
            formData.append('personalCheck', personalCheck)
            //console.log(formData)
            axios.post(`http://localhost:7400/posts/`, formData, { withCredentials: true, })
                .then((response) => {
                    console.log(response)
                    return response
                })
                .then(({ data }) => {
                    sendNewPost(data);
                    if(image) setImage(null);
                })
                .catch((err) => { console.log(err) })
        }
        else {
            setError("*")
        }
        document.getElementById("shareTextbox").value = ""
        setDescription('');
    }

    /////////////////////////////////////////////////////////////

    const handleChange = (event) => {
        const { target: { value }, } = event;   // On autofill we get a stringified value.
        if (value.length <= 3) setTagName(typeof value === 'string' ? value.split(',') : value,); //setting 3 selections as max tags
    };
    /////////////////////////////////////////////////////////////



    return (
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className='shareProfileImg' src={`http://localhost:7400/images/${user.profilePicture}`} alt="" />
                    {error && <div style={{ color: 'red', fontWeight: 'bolder' }}> {error}</div>}
                    <input placeholder={placeholder} required id="shareTextbox" className='shareInput' onChange={(e) => { setDescription(e.target.value) }} />
                </div>
                <hr className='shareHr' />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <IconButton color="primary" aria-label="upload picture" component="label">
                                <PermMediaIcon htmlColor='tomato' className='shareIcon' />
                                <input hidden type="file" name="image1" accept="image/png, image/jpeg" onChange={(e) => { setImage(e.target.files[0]) }} />
                            </IconButton>
                            <span className='shareOptionText'>{t("Photo")} </span>
                            { image && <span className='PhotoUploadDN' >{t("Uploaded")}</span>}           
                        </div>
                    </div>

                    <div className="shareOptions">
                        <div className="shareOption">
                            <LocalOfferIcon htmlColor='blue' />
                            <FormControl sx={{ width: '250px' }} size="small" >
                                <InputLabel id="demo-multiple-checkbox-label">{t("Tags max:3")}</InputLabel>
                                <Select labelId="demo-multiple-checkbox-label" id="demo-multiple-checkbox" multiple value={TagName} onChange={handleChange} input={<OutlinedInput label="Tag" />} renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps} >
                                    {Tags.map((tag) => (
                                        <MenuItem key={tag} value={tag} >
                                            <AlternateEmailIcon htmlColor='blue' classtag='shareIcon' />
                                            <ListItemText primary={tag} />
                                            <Checkbox checked={TagName.indexOf(tag) > -1} size="small" />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <Button variant="contained" style={{ backgroundColor: 'purple' }} onClick={makePost} size="small">{t("Share")}</Button>
                </div>
            </div>
        </div>



    )
}

export default Share;