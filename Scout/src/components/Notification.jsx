
const Notification = ({ userId, notification }) => {

    const readNotification = async () => {
        const res = await fetch(`https://scouttestserver.onrender.com/api/updatenotifications/${notification.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ 
            read: true 
            })
        });
    }

    const handleClick = (e) => {
        readNotification();
    }

    return (
    <>
    <li className="flex flex-row justify-center space-between items-center">
        <a className="hover:bg-slate-100 w-48"> {notification.message}</a>
        <input type="checkbox" className="checkbox" onClick={handleClick} />
    </li>
    </>
    )
}

export default Notification