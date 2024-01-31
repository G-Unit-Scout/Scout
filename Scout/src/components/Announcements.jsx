import Announcement from "./Announcement"

const Announcements = ( {announcements} ) => {

    return announcements.map ( (announcement) => (
        <>
        <Announcement announcement={announcement} />
        </>
        )
        
    )

}

export default Announcements