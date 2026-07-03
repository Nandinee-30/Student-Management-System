import { useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import "./ManageStudents.css";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function ManageStudents() {

    const [showPopUp, setShowPopUp] = useState(false);
    const [allClasses, setAllClasses] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        name: "",
        fatherName: "",
        email: "",
        password: "",
        class: ""
    })

    const navigate = useNavigate();

    useEffect(() => {
        async function getClasses() {
            const res = await fetch(`http://localhost:4400/class/${localStorage.getItem("userId")}`);
            const response = await res.json();
            setAllClasses(response.data);
        }
        async function getStudents() {
            const res = await fetch(`http://localhost:4400/student/all`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: localStorage.getItem("userId") })
            })
            const response = await res.json();
            setAllStudents(response.data);
        }
        getStudents();
        getClasses();
    }, [])

    async function handleSubmit() {

        const res = await fetch(`http://localhost:4400/student/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...data, userId: localStorage.getItem("userId") })
        })

        const response = await res.json();
        if (response.success) {
            toast.success("Student Added Successfully");
            const temp = [...allStudents];
            temp.push({ name: data.name, email: data.email, class: data.class, fatherName: data.fatherName })
            setData(temp);
        }
        else {
            toast.error(response.message);
        }
        setData({
            name: "",
            fatherName: "",
            email: "",
            password: "",
            class: ""
        })
        setShowPopUp(false);
    }

    const classes = [
        { id: 'One', label: 'Class : 01' },
        { id: 'Two', label: 'Class : 02' },
        { id: 'Three', label: 'Class : 03' },
        { id: 'Four', label: 'Class : 04' },
        { id: 'Five', label: 'Class : 05' },
        { id: 'Six', label: 'Class : 06' },
        { id: 'Seven', label: 'Class : 07' },
        { id: 'Eight', label: 'Class : 08' },
        { id: 'Nine', label: 'Class : 09' },
        { id: 'Ten', label: 'Class : 10' },
        { id: 'Eleven', label: 'Class : 11' },
        { id: 'Twelve', label: 'Class : 12' },
    ];

    return <>

        <section id="students-main" className="w-screen h-screen flex font-sans">

            <AdminHeader className="w-fit" />

            <div className="flex-1 overflow-auto bg-gray-200">

                <div className="logo text-5xl font-sans tracking-tight font-light bg-white w-full p-3 flex justify-between border-b border-gray-300">SMART ED</div>

                <div className="flex flex-col items-center gap-10 min-h-screen p-10">

                    <h1 className="text-5xl font-sans tracking-tight font-thin">MANAGE STUDENTS</h1>

                    {showPopUp ? <div id="add-student-pop-up" className="w-full font-sans" onClick={() => { setShowPopUp(false) }}>

                        <form onClick={(e) => e.stopPropagation()} onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }} className="flex flex-col gap-4 p-6 rounded-lg bg-white w-full ">

                            <h1 className="text-2xl flex self-center">Add Student</h1>

                            <div className="flex gap-4 items-center">
                                <span>Student's Name : </span>
                                <input type="text" placeholder="Enter Student's Name" value={data.name} className="border-b flex-1 px-2 py-1 outline-none" onChange={(e) => {
                                    const temp = { ...data };
                                    temp.name = e.target.value;
                                    setData(temp);
                                }} />
                            </div>

                            <div className="flex gap-4 items-center">
                                <span>Father's Name : </span>
                                <input type="text" placeholder="Enter Student's Father Name" value={data.fatherName} className="border-b flex-1 px-2 py-1 outline-none" onChange={(e) => {
                                    const temp = { ...data };
                                    temp.fatherName = e.target.value;
                                    setData(temp);
                                }} />
                            </div>

                            <div className="flex gap-4 items-center">
                                <span>Email : </span>
                                <input type="email" placeholder="Enter Student's Email" value={data.email} className="border-b flex-1 px-2 py-1 outline-none" onChange={(e) => {
                                    const temp = { ...data };
                                    temp.email = e.target.value;
                                    setData(temp);
                                }} />
                            </div>

                            <div className="flex gap-4 items-center">
                                <span className="text-nowrap">Password : </span>
                                <div className="flex items-center border-b w-full">
                                <input type={showPassword ? "text" : "password"} placeholder="Enter Student's Password" value={data.password} className="flex-1 px-2 py-1 outline-none" onChange={(e) => {
                                    const temp = { ...data };
                                    temp.password = e.target.value;
                                    setData(temp);
                                }} />
                                <span className="px-2">
                                    {showPassword ? <FaEye onClick={() => { setShowPassword(false) }} /> : <FaEyeSlash onClick={() => { setShowPassword(true) }} />}
                                </span>
                                </div>
                            </div>

                            <div className="flex gap-4 items-center">
                                <span>Class : </span>
                                <select className="border" value={data.class} onChange={(e) => {
                                    const temp = { ...data };
                                    temp.class = e.target.value;
                                    setData(temp);
                                }}>
                                    <option value="" hidden>Select</option>
                                    {allClasses.map((el, ix) => {
                                        return <option value={el.className} key={ix}>{el.className}</option>
                                    })}
                                </select>
                            </div>


                            <div className="flex self-center gap-5 mt-4 mb-1">
                                <input className="px-5 py-3 rounded-full bg-gray-700 hover:scale-105 hover:cursor-pointer transition-all duration-200 text-white hover:bg-gray-300 hover:text-black cursor-pointer" type="submit" value="Add Student" />
                                <input className="px-5 py-3 rounded-full bg-gray-700 hover:scale-105 hover:cursor-pointer transition-all duration-200 text-white hover:bg-gray-300 hover:text-black cursor-pointer" type="reset" value="Reset" />

                                <button className="px-5 py-3 rounded-full bg-gray-700 hover:scale-105 hover:cursor-pointer transition-all duration-200 text-white hover:bg-gray-300 hover:text-black cursor-pointer" onClick={() => { setShowPopUp(false) }}>
                                    Go Back
                                </button>
                            </div>

                        </form>

                    </div> : ""}

                    <div className="w-full flex justify-end items-center">
                        <button onClick={() => { setShowPopUp(true) }} className="px-4 py-2 rounded-full bg-gray-700 hover:scale-105 hover:cursor-pointer transition-all duration-200 text-white hover:bg-gray-300 hover:text-black cursor-pointer">Add Student</button>
                    </div>

                    <div className="border p-6 rounded-lg bg-white w-full grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6">
                        {/* {allStudents.map((el, ix) => {
                            return <div className="student-card">
                                <div>Name:{el.name}</div>
                                <div>Email:{el.email}</div>
                                <div>Father Name:{el.fatherName}</div>
                                <div>Class:{el.class}</div>
                            </div>
                        })} */}

                        {classes.map((cls) => (
                            <>
                                <div key={cls.id} onClick={() => navigate(`/admin/manage-students/class/${cls.id}`)} className="classes border p-4 rounded-lg bg-gray-900 text-white font-serif flex place-content-center h-40 hover:bg-gray-700 hover:scale-110 hover:cursor-pointer transition-all duration-200 text-2xl">{cls.label}</div>
                            </>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    </>
}

export default ManageStudents;