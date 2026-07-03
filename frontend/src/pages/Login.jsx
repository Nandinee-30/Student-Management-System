import "./Login.css";
import Header from "../components/Header"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [visible, setVisible] = useState(false)

    const showPassword = () => {
        setVisible(!visible);
    }
    
    async function handleSubmit() {
        const res = await fetch("http://localhost:4400/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        const response = await res.json();
        console.log(response);
        if (response.success) {
            toast.success("Login Successfully");
            localStorage.setItem("userId", response.data._id);
            if (response.data.role == "admin") {
                navigate("/admin");
            }
            else if (response.data.role == "teacher") {
                navigate("/teacher/mark-attendence");
            }
            else if (response.data.role == "student") {
                navigate("/student/attendence");
            }
        }
        else {
            toast.error(response.message);
        }
        setEmail("");
        setPassword("");
    }
    return <>
        <Header />
        <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        <div id="login" className="flex justify-center items-center h-full pt-[72px]">
            <form className="flex flex-col gap-4 rounded-2xl p-15" onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <h1 className="text-4xl font-sans font-bold tracking-tight mb-6">LOGIN</h1>
                <input type="email" required className="border w-full py-2 px-5 rounded-full text-lg" placeholder="Enter Email" value={email} onChange={(e) => {
                    setEmail(e.target.value);
                }} />
                <div className="flex outline w-full py-2 px-5 rounded-full text-lg gap-2 items-center focus-within:outline-2">
                    <input type={visible ? "text" : "password"} required placeholder="Enter Admin Password" className="w-full outline-none" value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }} />
                    <span className='scale-120' onClick={showPassword}>{visible ? <FaEyeSlash /> : <FaEye />}</span>
                </div>

                {/* <input type="password" required className="border w-full py-2 px-5 rounded-full text-lg" placeholder="Enter Password" value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }} /> */}

                <p className="m-4 font-sans flex gap-3"><span>New User?</span>
                    <span onClick={() => { navigate("/register") }} className="text-indigo-600 hover:text-red-500 hover:underline hover:cursor-pointer">Register Here..</span>
                </p>
                <input type="submit" value="Login" className="border text-xl px-7 py-2 rounded-full cursor-pointer bg-indigo-500 text-white font-bold hover:bg-indigo-400 hover:scale-110 transition-transform duration-200" />
            </form>
        </div>
    </>
}

export default Login;