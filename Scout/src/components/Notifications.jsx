import { useState, useEffect } from "react";
import Notification from "./Notification";

const Notifications = ({ userId, notifications}) => {


    return notifications.map( (notification) => {
        <>
        <Notification notification={notification} 
        userId={userId}/>
        </>
    })
}

export default Notifications;