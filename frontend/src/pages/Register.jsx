import { Link } from "react-router-dom";
import Header from "../components/Header"
import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {

    const [visible, setVisible] = useState(false)

    const showPassword = () => {
        setVisible(!visible);
    }

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        file: null
    });
    const navigate = useNavigate();
    async function handleSubmit() {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("logo", data.file);
        const res = await fetch("http://localhost:4400/school/add", {
            method: "POST",
            body: formData
        })
        const response = await res.json();
        console.log(response);
        if (response.success) {
            alert("Registered Scuccessfully")
            navigate("/login");
        }
        else {
            alert(response.message);
        }
        setData({
            name: "",
            email: "",
            password: "",
            file: null
        })
    }
    return <>
        <Header />
        <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        <section id="register" className="pt-[75px]">
            <form className="flex flex-col bg-white place-items-center p-15 gap-3 font-sans h-fit rounded-2xl w-[40%]" onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <h1 className="text-4xl font-bold tracking-tight mb-6">REGISTER YOUR SCHOOL</h1>

                <input type="text" placeholder="Enter School Name" className="border w-full py-2 px-5 rounded-full text-lg" value={data.name} onChange={(e) => {
                    const temp = { ...data };
                    temp.name = e.target.value;
                    setData(temp);
                }} />
                <input type="email" placeholder="Enter Admin Email" className="border w-full py-2 px-5 rounded-full text-lg" value={data.email} onChange={(e) => {
                    const temp = { ...data };
                    temp.email = e.target.value;
                    setData(temp);
                }} />

                <div className="flex outline w-full py-2 px-5 rounded-full text-lg gap-2 items-center focus-within:outline-2">
                    <input type={visible ? "text" : "password"} placeholder="Enter Admin Password" className="w-full outline-none" value={data.password} onChange={(e) => {
                        const temp = { ...data };
                        temp.password = e.target.value;
                        setData(temp);
                    }} />
                    <span className='scale-120' onClick={showPassword}>{visible ? <FaEyeSlash /> : <FaEye />}</span>
                </div>

                <input type="file" className="m-4 border w-fit p-2" onChange={(e) => {
                    const temp = { ...data };
                    temp.file = e.target.files[0];
                    setData(temp);
                }} />

                <p className="m-4 font-sans flex gap-3"><span>Existing User?</span> <Link to="/login" className="text-indigo-600 hover:text-red-500 hover:underline hover:cursor-pointer" >Login Here..</Link></p>

                <input type="submit" value="Register" id="btn1" className="border text-xl px-7 py-2 rounded-full cursor-pointer bg-indigo-500 text-white font-bold hover:bg-indigo-400 hover:scale-110 transition-transform duration-200" />
            </form>
        </section>
    </>
}

export default Register;