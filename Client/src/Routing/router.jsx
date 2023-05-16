// import {
//     createBrowserRouter,
//     createRoutesFromElements,
//     Route,
//     RouterProvider
// } from 'react-router-dom'

// import Landing from '../Pages/1LandingPage/Landing.jsx';
// import Login from ".../Pages/3Login/Login.jsx";
// import Register from '../Pages/2Register/Register.jsx';
// import Home from "../Pages/4Home/Home";
// import Profile from "../Pages/5Profile/Profile";
// import Messanger from "../Pages/6Messenger/Messenger";
// import Meetups from "../Pages/8Meetups/Meetups";
// import Search from "../Pages/11Search/Search";
// import Error404 from "../Components/Error404";
// import Community from "../Pages/10Community/Community";
// import CommunitySearch from "../Pages/10Community/components/communitySearch";
// import addCommunity from "../Pages/10Community/components/addCommunity";
// import CreateCommunity from "../Pages/10Community/createCommunity/createCommunity";
// import NotifyModal from "../Pages/7Notifications/NotifyModal";
// import Notifications from "../Pages/7Notifications/Notifications";
// import ComponentSearch from "../Pages/10Community/components/ComponentSearch";
// import UpdateProfile from "../Pages/5Profile/Components/UpdateProfile/UpdateProfile";

// import Posts from "../Pages/4Home/routing components/posts";
// import UserCommunitySearch from "../Pages/4Home/routing components/usersCommunitySearch";


// const router2 = createBrowserRouter(
//     createRoutesFromElements(
//         <Route path="/">
//             <Route
//                 path="/"
//                 element={
//                     !user ? <Landing></Landing> : <Navigate to="/home"></Navigate>
//                 }
//             ></Route>
//             <Route
//                 path="/login"
//                 element={!user ? <Login></Login> : <Navigate to="/home"></Navigate>}
//             ></Route>
//             <Route
//                 path="/register"
//                 element={
//                     !user ? <Register></Register> : <Navigate to="/home"></Navigate>
//                 }
//             ></Route>

//             <Route
//                 path="/home"
//                 element={
//                     user ? <Home socket={socket} /> : <Navigate to="/login"></Navigate>
//                 }
//             ></Route>
//             <Route
//                 path="/search"
//                 element={user ? <Search /> : <Navigate to="/login"></Navigate>}
//             ></Route>
//             <Route
//                 path="profile"
//                 element={user ? <Profile /> : <Navigate to="/login"></Navigate>}
//             ></Route>{" "}
//             {/* "profile/:userID" */}
//             <Route path="messenger" element={<Messanger />}></Route>
//             <Route path="/updateProfile" element={<UpdateProfile />}></Route>
//             {/* <Route path="notifications" element={<Notifications/>}></Route> */}
//             <Route path="meetups" element={<Meetups />}></Route>{" "}
//             {/* "meetups/:meetupID" */}
//             <Route path="/community/:id" element={<Community />}></Route>
//             <Route path="/communitysearch" element={<CommunitySearch />}></Route>
//             <Route
//                 path="notifications"
//                 element={<Notifications socket={socket} />}
//             ></Route>
//             {/* <Route path="notifications/:id" element={<NotifyModal />}></Route> */}
//             <Route path="notifications/:userId" element={<Notifications socket={socket} />}></Route>
//             <Route path="componentSearch" element={<ComponentSearch />}></Route>
//             {/* <Route path="addNewCommunity" element={<addCommunity/>}></Route> */}
//             <Route path="/addnewcommunity" element={<CreateCommunity />}></Route>

//             {/* will be nested route for Home Page */}
//             <Route path="/posts" element={<Posts socket={socket} />}></Route>
//             <Route path="/usrcommsrch/:searchtext" element={<UserCommunitySearch />}></Route>

//             <Route path="*" element={<Error404></Error404>}></Route>
//         </Route>
//     )
// )


// export default router2;