import React, { useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';
import NavBar from '../../Components/NavBar'; 
import './Search.css';
import axios from 'axios';

const Search = () => { 
let search = useLocation()
useEffect(()=>{
search.split(" ")
 axios.post(`http://localhost:7400/search`,{firstName:search[0], lastName:search[1] }, {withCredentials: true} )
        .then((response)=>{return response})
        .then(({data})=>{
          
        })
        .catch((err)=>{console.log(err)})
}, [])
    return (
        <div>
            <NavBar/> 
            Search worksss
        </div>
    );
};

export default Search;
