import React from 'react';
import NavBar from '../../Components/NavBar';
import Notification from './components/notification'
import './Notifications.css'




const Notifications = () => {

    return (
        <>
            <NavBar/>
            <div className='MainNotificationComponent'>
                <div className='TheNotification' >
                    <Notification 
                        title="New Comment on Your Post"
                        userImage="/assets/noAvatar.png"
                        time="44 minutes ago"
                        description="You have a new comment from Abdooo... ay 7aga "
                        icon={<i className="fas fa-envelope"></i>}
                    />
                    <Notification 
                        title="New Comment on Your Post"
                        userImage="/assets/noAvatar.png"
                        time="44 minutes ago"
                        description="You have a new comment from Abdooo... ay 7aga "
                        icon={<i className="fas fa-envelope"></i>}
                    />
                    <Notification 
                        title="New Comment on Your Post"
                        userImage="/assets/noAvatar.png"
                        time="44 minutes ago"
                        description="You have a new comment from Abdooo... ay 7aga "
                        icon={<i className="fas fa-envelope"></i>}
                    />
                    <Notification 
                        title="New Comment on Your Post"
                        userImage="/assets/noAvatar.png"
                        time="44 minutes ago"
                        description="You have a new comment from Abdooo... ay 7aga "
                        icon={<i className="fas fa-envelope"></i>}
                    />
                    <Notification 
                        title="New Comment on Your Post"
                        userImage="/assets/noAvatar.png"
                        time="44 minutes ago"
                        description="You have a new comment from Abdooo... ay 7aga "
                        icon={<i className="fas fa-envelope"></i>}
                    />
                    <Notification 
                        title="New Comment on Your Post"
                        userImage="/assets/noAvatar.png"
                        time="44 minutes ago"
                        description="You have a new comment from Abdooo... ay 7aga "
                        icon={<i className="fas fa-envelope"></i>}
                    />
                    <Notification 
                        title="New Comment on Your Post"
                        userImage="/assets/noAvatar.png"
                        time="44 minutes ago"
                        description="You have a new comment from Abdooo... ay 7aga "
                        icon={<i className="fas fa-envelope"></i>}
                    />
                </div>
            </div>
        </>
    );
};

export default Notifications;
