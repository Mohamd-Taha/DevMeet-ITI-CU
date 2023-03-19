// import React from "react";
// import "./Notifications.css";
// import moment from "moment";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const Notification = ({ socket }) => {
//   let { userId } = useParams();
//   console.log("user id is ");
//   console.log(userId);
//   const [notify, setnotify] = useState([]);

//   var handleDeleteAll = () => {
//     setnotify([]);
//     console.log("handleDeleteAll");
//   };

//   //   let dummyNotifications = [
//   //     {
//   //       id: "640fb3ba8c59464e3c307751",
//   //       text: "Added New Post",
//   //       createdAt: "2023-03-14T10:30:02.170Z",
//   //       content: "ITI CU MEARN",
//   //       user: {
//   //         _id: "640fb3ba8c59464e3c307751",
//   //         profilePicture: "sobhy kaber.png",
//   //         firstName: "sobhy",
//   //         lastName: "kabr",
//   //       },
//   //     },
//   //   ];

//   // useEffect(() => {
//   //   socket.on("createNotifyToClient", (data) => {
//   //     console.log("createNotifyToClient");
//   //     console.log(data);
//   //     setnotify([data, ...notify]);
//   //   });
//   // });

//   useEffect(() => {
//     console.log("notification mounting");
//     axios
//       .get(`http://localhost:7400/notifications`, {
//         params: { id: userId },
//       })
//       .then((res) => {
//         setnotify(res.data);
//         console.log("Notification array is ");
//         console.log(res.data);
//       });
//   }, []);

//   return (
//     <div>
//       {notify.map((e) => (
//         <div className="wrapper">
//           <img
//             className="UserImage"
//             src={`http://localhost:7400/images/${e.user.profilePicture}`}
//             alt="User image"
//           />
//           <div className="NotificationContent">
//             <h3 className="Title">{e.text}</h3>
//             <span className="Time">Time: {moment(e.createdAt).fromNow()}</span>
//             <p className="Description">{e.content}</p>
//             <p className="Description">{e.user.firstName}</p>
//           </div>
//           <span className="Icon">
//             <img
//               className="UserImage"
//               src={`http://localhost:7400/images/notifyIcon.png`}
//             />
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Notification;



import React from "react";
import "./Notifications.css";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Notification = ({ socket }) => {
  let { userId } = useParams();
  console.log("user id is ");
  console.log(userId);
  const [notify, setnotify] = useState([]);
  let notifyTypeIcon;


  var handleDeleteAll = () => {
    setnotify([]);
    console.log("handleDeleteAll");
  };
  let dummyNotifications = [
    {
      id: "640fb3ba8c59464e3c307751",
      text: "Added New Post",
      createdAt: "2023-03-14T10:30:02.170Z",
      content: "ITI CU MEARN",
      user: {
        _id: "640fb3ba8c59464e3c307751",
        profilePicture: "sobhy kaber.png",
        firstName: "sobhy",
        lastName: "kabr",
      },
    },
  ];

  useEffect(() => {
    socket.on("createNotifyToClient", (data) => {
      console.log("createNotifyToClient");
      console.log(data);
      setnotify([data, ...notify]);
    });
  });

  useEffect(() => {
    console.log("notification mounting");
    axios
      .get(`http://localhost:7400/notifications`, {
        params: { id: userId },
      })
      .then((res) => {
        setnotify(res.data);
        console.log("Notification array is ");
        console.log("🚀 ~ file: Notifications.jsx:137 ~ res.data:", res.data)
        
        
      });
  }, []);

  return (
    <div>
      {notify.map((e) => {

        //determine the icon
        if(e.text=="like your post.")
        {notifyTypeIcon="likeNotify.png"}
        else if(e.text=="Added New Post")
        {notifyTypeIcon="addPostNotify.png"}
        else if(e.text=="Added a Comment on Post")
        {notifyTypeIcon="addcommentNotify.png"}

        return(
          <div key={e._id} className="wrapper">
          <img
            className="UserImage"
            src={`http://localhost:7400/images/${e.user.profilePicture}`}
            alt="User image"
          />
          <div className="NotificationContent">
            <h3 className="Title"> {e.user.firstName} {e.user.lastName}  {e.text}</h3>
            <span className="Time">Time: {moment(e.createdAt).fromNow()}</span>
            <p className="Description">{e.content}</p>
            {/* <p className="Description"><h4>{e.user.firstName} {e.user.lastName}</h4></p> */}
          </div>
          <span className="Icon">
            <img
              className="UserImage"
              src={`http://localhost:7400/images/${notifyTypeIcon}`}
            />
          </span>
        </div>
        )
      })}
    </div>
  );
};

export default Notification;
