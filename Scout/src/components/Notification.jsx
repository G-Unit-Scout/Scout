
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
        <svg xmlns="http://www.w3.org/2000/svg" className="m-0 p-0 w-10"><path d="m2 4v16.002c0 .385.22.735.567.902.346.166.758.119 1.058-.121l4.725-3.781h12.65c.552 0 1-.448 1-1v-12.002c0-.552-.448-1-1-1h-18c-.552 0-1 .448-1 1zm18.5 11.502h-12.677l-4.323 3.46v-14.462h17zm-8.502-6.5c.414 0 .75.336.75.75v3.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-3.5c0-.414.336-.75.75-.75zm.002-3c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z" fill-rule="nonzero"/></svg>
        <a className="hover:bg-slate-100 w-48"> {notification.message}</a>
        <input type="checkbox" className="checkbox" onClick={handleClick} />
    </li>
    </>
    )
}

export default Notification