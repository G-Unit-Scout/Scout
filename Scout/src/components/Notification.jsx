
const Notification = ({ userId, notification }) => {

    return <li className="flex flex-row justify-center space-between items-center"><a className="hover:bg-slate-100 w-48"> {notification.message}</a><input type="checkbox" className="checkbox"/></li>
}

export default Notification