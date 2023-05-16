import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {AuthContextProvider} from "./Context/AuthContext"
import 'bootstrap/dist/css/bootstrap.css';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <AuthContextProvider>
    <App />  
    </AuthContextProvider>
  // </React.StrictMode>
);



// this is was in Abdo's index --- leave it commented
// const root = ReactDOM.createRoot(document.getElementById('root'))   
// root.render(
//             <App /> 
//           );


