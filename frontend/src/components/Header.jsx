import "./Header.css";
import { NavLink } from "react-router-dom";
function Header() {
    return <>
        <header id="header1">
            <nav className="bg-transparent flex justify-between py-4 px-20 text-white items-center font-sans absolute w-full z-20">
                <h1 className="text-4xl flex items-center font-light select-none tracking-tight font-sans">SMART ED</h1>
                <ul className="flex gap-5">
                    <li className="text-lg tracking-wide hover:scale-110 transition-transform duration-200"><NavLink className={(e) => { return e.isActive ? "py-2 px-3 rounded-full" : "py-2 px-3 text-stone-300 rounded-full" }} to="/">HOME</NavLink></li>
                    <li className="text-lg tracking-wide hover:scale-110 transition-transform duration-200"><NavLink className={(e) => { return e.isActive ? "py-2 px-3 rounded-full" : "py-2 px-3 text-stone-300 rounded-full" }} to="/login">LOGIN</NavLink></li>
                    <li className="text-lg tracking-wide hover:scale-110 transition-transform duration-200"><NavLink className={(e) => { return e.isActive ? "py-2 px-3 rounded-full" : "py-2 px-3 text-stone-300 rounded-full" }} to="/register">REGISTER</NavLink></li>
                    <li className="text-lg tracking-wide hover:scale-110 transition-transform duration-200"><NavLink className={(e) => { return e.isActive ? "py-2 px-3 rounded-full" : "py-2 px-3 text-stone-300 rounded-full" }} to="/about">ABOUT</NavLink></li>
                    <li className="text-lg tracking-wide hover:scale-110 transition-transform duration-200"><NavLink className={(e) => { return e.isActive ? "py-2 px-3 rounded-full" : "py-2 px-3 text-stone-300 rounded-full" }} to="/contact">CONTACT</NavLink></li>
                </ul>
            </nav>
        </header>
    </>
}

export default Header;