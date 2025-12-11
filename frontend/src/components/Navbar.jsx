import { NavLink } from "react-router-dom";
import Sidebar from "../Examples/sidebar";

const Navbar = () => {
    //Make component active if first part of url matches


    return (
        <nav>
            <div className="w-full h-16 bg-blue-600 flex items-center px-4">
                <div className="text-white font-bold text-xl">BigBite</div>
                <div className="ml-auto flex space-x-4">
                    <NavLink to="/chat/new" className={({ isActive }) => isActive ? "text-white font-semibold" : "text-gray-300 hover:text-white"}>Chat AI</NavLink>
                    <NavLink to="/todo" className={({ isActive }) => isActive ? "text-white font-semibold" : "text-gray-300 hover:text-white"}>To-Do</NavLink>
                    <NavLink to="/notes/new" className={({ isActive }) => isActive ? "text-white font-semibold" : "text-gray-300 hover:text-white"}>Notes</NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;