
const Announcement = ({ announcement }) => {

    return (
        <>
        <li className="flex flex-row justify-center space-between items-center">
            <a className="hover:bg-slate-100 w-48"> {announcement.message}</a>
        </li>
        </>
    )

}

export default Announcement