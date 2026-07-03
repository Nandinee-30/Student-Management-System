import { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import "./ManageTeachers.css";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { MdDelete } from "react-icons/md";

function ManageTeachers() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false);
    const [allClasses, setAllClasses] = useState([]);
    const [allTeachers, setAllTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(-1);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        profile: null,
        classSubjects: []
    })
    const [selectedClass, setSelectedClass] = useState({ name: "", subject: "" });
    useEffect(() => {
        async function getClasses() {
            const res = await fetch(`http://localhost:4400/class/${localStorage.getItem("userId")}`);
            const response = await res.json();
            if (response.success) {
                console.log(response.data);
                setAllClasses(response.data);
            }
        }
        async function getTeachers() {
            const res = await fetch(`http://localhost:4400/teacher/all`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: localStorage.getItem("userId") })
            })
            const response = await res.json();
            setAllTeachers(response.data);
            // console.log(response.data);
        }
        getTeachers();
        getClasses();
    }, [])

    function handleClear() {
        setData({
            name: "",
            email: "",
            password: "",
            profile: null,
            classSubjects: []
        })
    }

    async function handleSubmit() {
        const formData = new FormData();
        formData.append("userId", localStorage.getItem("userId"));
        for (let i in data) {
            if (data[i] == "" || data[i] == null || data[i] == []) {
                toast.error(`${i} is required`);
                return;
            }
            if (i != "classSubjects") {
                formData.append(i, data[i])
            }
            else {
                formData.append(i, JSON.stringify(data[i]));
            }
        }
        const res = await fetch("http://localhost:4400/teacher/add", {
            method: "POST",
            body: formData
        })
        const response = await res.json();
        // console.log(response);
        if (response.success) {
            toast.success("Teacher Added Successfully");
            const temp = [...allTeachers];
            temp.push({ name: data.name, email: data.email, profile: response.data.teachers[(response.data.teachers.length) - 1].profile, classSubjects: data.classSubjects })
            setAllTeachers(temp);
        }
        else {
            toast.error(response.message);
        }
        handleClear();
        setShowPopUp(false);
    }

    async function handleRemoveTeacher(index) {
        const res = await fetch("http://localhost:4400/teacher/remove", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: localStorage.getItem("userId"), index: index })
        })
        const response = await res.json();
        if (response.success) {
            toast.success("Teacher Deleted Successfully");
            const temp = allTeachers.filter((el, ix) => ix != index);
            setAllTeachers(temp);

        }
        else {
            toast.error(response.message);
        }
    }

    return <>
        <section id="manage-teachers" className="w-screen h-screen flex font-sans">

            <AdminHeader className="w-fit" />

            <div className="flex-1 overflow-auto bg-gray-200">

                <div className="logo text-5xl font-sans tracking-tight font-light bg-white w-full p-3 flex justify-between border-b border-gray-300">SMART ED</div>

                <div className="flex flex-col items-center gap-10 min-h-screen p-10">

                    <h1 className="text-5xl font-sans tracking-tight font-thin">MANAGE TEACHERS</h1>

                    {showPopUp ? <div id="add-teacher-pop-up" className="w-full font-sans" onClick={() => { setShowPopUp(false) }}>

                        <div onClick={(e) => e.stopPropagation()}>

                            <div id="teacher-details-form" className="flex flex-col gap-4 p-6 rounded-lg bg-white w-full ">

                                <h1 className="text-2xl flex self-center">Add Teacher</h1>

                                <div className="flex gap-4 items-center">
                                    <span>Name : </span>
                                    <input type="text" placeholder="Enter Teacher Name" value={data.name} className="border-b flex-1 px-2 py-1 outline-none" onChange={(e) => {
                                        const temp = { ...data };
                                        temp.name = e.target.value;
                                        setData(temp);
                                    }} />
                                </div>

                                <div className="flex gap-4 items-center">
                                    <span>Email : </span>
                                    <input type="email" placeholder="Enter Teacher Email" value={data.email} className="border-b flex-1 px-2 py-1 outline-none" onChange={(e) => {
                                        const temp = { ...data };
                                        temp.email = e.target.value;
                                        setData(temp);
                                    }} />
                                </div>

                                <div className="flex gap-4 items-center ">
                                    <span className="text-nowrap">Password : </span>
                                    <div className="flex items-center border-b w-full" id="teacher-password">
                                        <input type={showPassword ? "text" : "password"}
                                        placeholder="Enter Teacher Password" value={data.password} className=" flex-1 px-2 py-1 outline-none" onChange={(e) => {
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
                                    <select className="border" value={selectedClass.name} onChange={(e) => {
                                        const temp = { ...selectedClass }; //{name:"",subject:""}
                                        temp.name = e.target.value;
                                        temp.subject = "";
                                        setSelectedClass(temp);
                                    }}>
                                        <option value="" hidden>Select</option>
                                        {allClasses.map((el, ix) => {
                                            return <option value={el.className} key={ix}>{el.className}</option>
                                        })}
                                    </select>
                                </div>


                                <div className="flex gap-4 items-center">
                                    <span>Subject : </span>
                                    <select className="border" value={selectedClass.subject} onChange={(e) => {
                                        const temp = { ...selectedClass };
                                        temp.subject = e.target.value;
                                        setSelectedClass(temp);
                                    }}>
                                        <option value="" hidden>Select</option>
                                        {allClasses.filter((el) => {
                                            return el.className == selectedClass.name
                                        })[0]?.subjects.map((el2, ix) => {
                                            return <option value={el2} key={ix}>{el2}</option>
                                        })}
                                    </select>
                                </div>


                                <div id="teacher-add-subject-btn" className="flex self-center">

                                    <button className="px-5 py-2 rounded-full bg-gray-700 hover:scale-105 hover:cursor-pointer transition-all duration-200 text-white hover:bg-gray-300 hover:text-black cursor-pointer" onClick={() => {
                                        if (selectedClass.name != "" && selectedClass.subject != "") {
                                            const isClassExists = data.classSubjects.filter((el) => {
                                                return el.name == selectedClass.name
                                            }).length > 0
                                            const temp = { ...data };
                                            if (isClassExists) {
                                                temp.classSubjects = temp.classSubjects.map((el, ix) => {
                                                    if (el.name == selectedClass.name && !el.subject.includes(selectedClass.subject)) {
                                                        el.subject.push(selectedClass.subject)
                                                    }
                                                    return el;
                                                })
                                            }
                                            else {
                                                temp.classSubjects.push({ name: selectedClass.name, subject: [selectedClass.subject] })
                                            }
                                            setData(temp);
                                            setSelectedClass({ name: "", subject: "" });
                                        }
                                    }}>Add Class</button>

                                </div>


                                <label className="flex gap-4 items-center">
                                    <span>Profile Picture : </span>
                                    <input className='border p-2' type="file" onChange={(e) => {
                                        const file = e.target.files[0];
                                        const temp = { ...data };
                                        temp.profile = file;
                                        // console.log(temp);
                                        setData(temp);
                                    }} />
                                </label>


                                <div className="flex self-center gap-5 mt-4 mb-1">
                                    <button className="px-5 py-3 rounded-full bg-gray-700 hover:scale-105 hover:cursor-pointer transition-all duration-200 text-white hover:bg-gray-300 hover:text-black cursor-pointer" onClick={() => { handleSubmit() }}>Add Teacher</button>
                                    <button className="px-5 py-3 rounded-full bg-gray-700 hover:scale-105 hover:cursor-pointer transition-all duration-200 text-white hover:bg-gray-300 hover:text-black cursor-pointer" onClick={() => { handleClear() }}>Clear</button>
                                    <button className="px-5 py-3 rounded-full bg-gray-700 hover:scale-105 hover:cursor-pointer transition-all duration-200 text-white hover:bg-gray-300 hover:text-black cursor-pointer" onClick={() => { setShowPopUp(false) }}>Go Back</button>
                                </div>

                            </div>
                            <div id="teacher-subjects">
                                {data.classSubjects.map((el, ix) => {
                                    return <div className="teacher-subject" key={ix}>
                                        <span id="remove-class" onClick={() => {
                                            const temp = { ...data };
                                            temp.classSubjects = temp.classSubjects.filter((el2, ix2) => {
                                                return ix != ix2;
                                            })
                                            setData(temp);
                                        }}>X</span>
                                        <h1>{el.name}</h1>
                                        <ul>
                                            {el.subject.map((el2, ix2) => {
                                                return <li key={ix + "" + ix2}>{el2}</li>
                                            })}

                                        </ul>
                                    </div>
                                })}
                            </div>

                        </div>

                    </div> : ""}

                    <div className="w-full flex justify-end items-center">
                        <button onClick={() => { setShowPopUp(true) }} className="px-4 py-2 rounded-full bg-gray-700 hover:scale-105 hover:cursor-pointer transition-all duration-200 text-white hover:bg-gray-300 hover:text-black cursor-pointer" >Add Teacher</button>
                    </div>

                    <div id="teachers-data" className="border p-2 rounded-lg bg-white w-full flex gap-6 font-sans">

                        {allTeachers.map((el, ix) => {

                            // return <div key={ix} className="teacher-card border p-4 rounded-lg flex bg-gray-400 justify-center flex-col w-52 gap-2 hover:bg-gray-800 cursor-pointer hover:scale-105 transition-all duration-200 hover:text-white relative" onClick={() => { setSelectedTeacher(ix == selectedTeacher ? -1 : ix) }}>

                            //     {selectedTeacher == ix ? <div className="absolute right-0 top-0 rounded-lg text-3xl p-2 text-red-500">
                            //         <MdDelete onClick={() => { handleRemoveTeacher(ix) }} />
                            //     </div> : ""}

                            //     <div className="flex justify-center items-center mb-2">
                            //         <img src={"http://localhost:4400/" + el.profile} width={"100px"} className="rounded-full" />
                            //     </div>

                            //     <div className="flex flex-col gap-2 w-full">
                            //         <p className="text-wrap">Name : {el.name}</p>
                            //         <p className="text-wrap">Email : {el.email}</p>
                            //     </div>

                            //     <div id="teacher-card-subject-details">

                            //         {el.classSubjects.map((el2, ix2) => {
                            //             return <div key={ix + "" + ix2} className="flex flex-col gap-2">
                            //                 <h2>Class : {el2.name}</h2>
                            //                 <div>
                            //                     {el2.subject.map((el3, ix3) => {
                            //                         return <span key={ix + "" + ix2 + "" + ix3}>Subject : {el3}</span>
                            //                     })}
                            //                 </div>
                            //             </div>
                            //         })}

                            //     </div>

                            // </div>

                            return <table className="w-full border-collapse border border-gray-500 text-left font-sans overflow-hidden rounded-lg">

                                <thead className="bg-gray-700 text-white">
                                    <tr>
                                        <th className="border p-2">Profile</th>
                                        <th className="border p-2">Name</th>
                                        <th className="border p-2">Email</th>
                                        <th className="border p-2">Class & Subjects</th>
                                        <th className="border p-2">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="bg-gray-400">

                                    {allTeachers.map((el, ix) => (
                                        <tr
                                            key={ix}
                                            className="border transition-all duration-200 cursor-pointer"
                                            onClick={() => setSelectedTeacher(ix === selectedTeacher ? -1 : ix)}>
                                                
                                            <td className="border p-2">
                                                <img
                                                    src={`http://localhost:4400/${el.profile}`}
                                                    width="60"
                                                    className="rounded-full mx-auto"
                                                />
                                            </td>
                                            <td className="border p-2">{el.name}</td>
                                            <td className="border p-2">{el.email}</td>
                                            <td className="border p-2">
                                                {el.classSubjects.map((el2, ix2) => (
                                                    <div key={ix2} className="mb-2">
                                                        <strong>Class : </strong> {el2.name}
                                                        <br />
                                                        <strong>Subjects : </strong>{" "}
                                                        {el2.subject.map((el3, ix3) => (
                                                            <span key={ix3} className="inline-block mr-2">
                                                                {el3}
                                                            </span>
                                                        ))}
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="border p-2 text-center">
                                                    <MdDelete
                                                        className="text-red-500 text-2xl inline-block"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleRemoveTeacher(ix)
                                                        }}
                                                    />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>


                        })}

                    </div>

                </div>

            </div>

        </section>
    </>
}

export default ManageTeachers;