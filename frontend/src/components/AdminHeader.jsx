import { NavLink } from "react-router-dom"
import "./AdminHeader.css";
import { RxDashboard } from "react-icons/rx";
import { PiStudent } from "react-icons/pi";
import { PiChalkboardTeacher } from "react-icons/pi";
import { IoBookOutline } from "react-icons/io5";
import { MdClass } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";

function AdminHeader() {
    return <>
        <nav className="bg-gray-900 md:flex flex-col py-4 px-15 text-white items-center font-sans h-screen w-fit xl:w-[28vw] hidden relative left-0 top-0 gap-10">

            <h1 className="text-4xl tracking-tight my-4">ADMIN PANEL</h1>

            <ul className="flex gap-5 flex-col">

                <li>
                    <NavLink to="/admin" className="text-xl font-bold text-white flex item-center justify-start hover:bg-gray-800 hover:scale-105 rounded-full px-4 py-2 transition-all duration-200 gap-2">
                        <span className="flex self-center"><RxDashboard /></span>
                        <span>Dashboard</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/admin/manage-students" className="text-xl font-bold text-white flex item-center justify-start hover:bg-gray-800 hover:scale-105 rounded-full px-4 py-2 transition-all duration-200 gap-2">
                        <span className="flex self-center"><PiStudent /></span>
                        <span>Manage Students</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/admin/manage-teachers" className="text-xl font-bold text-white flex item-center justify-start hover:bg-gray-800 hover:scale-105 rounded-full px-4 py-2 transition-all duration-200 gap-2">
                        <span className="flex self-center"><PiChalkboardTeacher /></span>
                        <span>Manage Teachers</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/admin/manage-subjects" className="text-xl font-bold text-white flex item-center justify-start hover:bg-gray-800 hover:scale-105 rounded-full px-4 py-2 transition-all duration-200 gap-2">
                        <span className="flex self-center"><IoBookOutline /></span>
                        <span>Manage Subjects</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/admin/manage-classes" className="text-xl font-bold text-white flex item-center justify-start hover:bg-gray-800 hover:scale-105 rounded-full px-4 py-2 transition-all duration-200 gap-2">
                        <span className="flex self-center"><MdClass /></span>
                        <span>Manage Classes</span>
                    </NavLink>
                </li>

                <li className="text-xl font-bold text-white flex item-center justify-start hover:bg-gray-800 hover:scale-105 rounded-full px-4 py-2 transition-all duration-200 gap-2" onClick={() => {
                    localStorage.removeItem("userId");
                    window.location.reload();
                }}>
                    <span className="flex self-center"><MdOutlineLogout /></span>
                    <span>Logout</span>
                </li>

            </ul>

        </nav>
    </>
}

export default AdminHeader;