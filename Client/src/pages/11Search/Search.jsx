import React, { useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';
import NavBar from '../../Components/NavBar'; 
import './Search.css';
import axios from 'axios';
import { useAuthContext } from "../../hooks/useAuthContext";

const Search = () => { 
  let { user } = useAuthContext()
let location = useLocation()
console.log(location)
let {search} = location.state 
useEffect(()=>{
try{
console.log(search)
search = search.split(" ")
console.log(search)
}
catch(err){
}
 axios.post(`http://localhost:7400/search`,{firstName:search[0], lastName:search[1] }, {withCredentials: true} )
        .then((response)=>{return response})
        .then(({data})=>{
          console.log(data)
        })
        .catch((err)=>{console.log(err)})
    
})
    return (
        <div>
            <NavBar/> 
            Search worksss
        </div>
    );
};

export default Search;
