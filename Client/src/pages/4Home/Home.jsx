import React from 'react';
import NavBar from '../../Components/NavBar';
import { BrowserRouter,Routes,Route, Switch, Link ,NavLink} from 'react-router-dom';
import Notifications from '../7Notifications/Notifications'
import Messanger from '../6Messenger/Messenger'
import Meetups from '../8Meetups/Meetups'
import Profile from '../5Profile/Profile'
import Error404 from '../../Components/Error404';
import LoginPage from '../3Login/Login';


const Home = () => {
    return (
        <div>
            <BrowserRouter> 
                <NavBar/>


                <Routes> 
                    <Route path="/" element={""}></Route>
                    <Route path="notifications" element={<Notifications/>}></Route>
                    <Route path="messenger" element={<Messanger/>}></Route>
                    <Route path="meetups" element={<Meetups/>}></Route>  {/* "meetups/:meetupID" */}
                    <Route path="profile" element={<Profile/>}></Route>  {/* "profile/:userID" */}
                    <Route path="logout" element={<LoginPage/>}></Route>
                    <Route path="*" element={<Error404></Error404>}></Route>
                </Routes> 



            </BrowserRouter>
        </div>
    );
};

export default Home;