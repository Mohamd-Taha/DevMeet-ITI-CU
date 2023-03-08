import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {AuthContextProvider} from "./Context/AuthContext"

import './styles/community.css'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <App />  
    </AuthContextProvider>
  </React.StrictMode>
);



// this is was in Abdo's index --- leave it commented
// const root = ReactDOM.createRoot(document.getElementById('root'))   
// root.render(
//             <App /> 
//           );






// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA
