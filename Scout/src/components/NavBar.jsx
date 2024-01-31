import { useState } from "react"

import Notifications from "./Notifications"
import Settings from "./Settings"

function NavBar({ changeJobPosting, handleLogout }) {
    const [notification, setNotification] = useState(true)
    const [showSettings, setShowSettings] = useState(false)

    const handleClick = (e) => {
        setNotification(false);
    }

    const openJobPosting = (e) => {
        changeJobPosting(true)
    }

    const openPersonalBoard = (e) => {
        changeJobPosting(false)
    }

    const handleSettings = () => {
            setShowSettings(!showSettings)
        
    }

    return(
    <div className="navbar bg-[#0D0F4A] text-[#eb8c2d]">
        <div className="navbar-start">
            <a className="btn btn-ghost text-xl">SCOUT</a>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal text-white px-1">
            <li><a onClick={openJobPosting} className="hover:text-[#eb8c2d]">Job Board</a></li>
            <li><a onClick={openPersonalBoard} className="hover:text-[#eb8c2d]">Personal Board</a></li>
            </ul>
        </div>
        <div className="navbar-end">
            <div class="drawer flex justify-end">
                <input id="my-drawer" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content">
                <label for="my-drawer" onClick={handleClick} className="btn btn-ghost btn-circle drawer-button">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        <span className={`badge badge-xs badge-primary indicator-item ${notification ? `` : `invisible`}`}></span>
                    </div>
                </label>
                </div>
                <div class="drawer-side z-40">
                    <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
                    <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        <li className="flex flex-row justify-between items-center"><a className="hover:bg-slate-100">Notification 1</a><input type="checkbox" className="checkbox"/></li>
                        <li className="flex flex-row justify-between items-center"><a className="hover:bg-slate-100">Notification 2</a><input type="checkbox" className="checkbox"/></li>
                    </ul>
                </div>
            </div>
            <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                user 42
                </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a onClick={handleSettings}>Settings</a></li>
                        <li><a href="#" onClick={handleLogout}>Logout</a></li>
            </ul>
            </div>
        </div>
        
    </div>

    )
}

export default NavBar

