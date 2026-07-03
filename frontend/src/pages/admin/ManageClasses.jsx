import { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./ManageClasses.css";
import { toast } from "react-hot-toast"
function ManageClasses() {
    const [allSubjects, setAllSubjects] = useState([]);
    const [className, setClassName] = useState("");
    const [classSubjects, setClassSubjects] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);
    const [allClasses, setAllClasses] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const colors = ["rgba(0, 157, 255, 0.774)", "rgba(0, 255, 76, 0.774)", "rgba(255, 196, 0, 0.774)", "rgba(255, 0, 217, 0.774)", "rgba(255, 0, 93, 0.774)"];
    const [showEditDelete, setShowEditDelete] = useState(-1);
    const [editClassIndex, setEditClassIndex] = useState(-1);
    useEffect(() => {

        async function getSubjects() {
            const res = await fetch(`http://localhost:4400/subject/${localStorage.getItem("userId")}`)
            const response = await res.json();
            setAllSubjects(response.data);
        }

        async function getClasses() {
            const res = await fetch(`http://localhost:4400/class/${localStorage.getItem("userId")}`);
            const response = await res.json();
            setAllClasses(response.data);
        }

        getClasses();
        getSubjects();
    }, [])

    async function handleSubmit() {
        const res = await fetch("http://localhost:4400/class/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                className: className,
                classSubjects: classSubjects,
                userId: localStorage.getItem("userId")
            })
        })
        const response = await res.json();
        if (response.success) {
            toast.success("Class Added Successfully");
            const temp = [...allClasses];
            temp.push({ className: className, subjects: classSubjects });
            setAllClasses(temp);
        }
        else {
            toast.error(response.message);
        }
        setClassName("");
        setClassSubjects([])
        setShowPopUp(false);
    }

    async function handleDelete(index) {
        const res = await fetch(`http://localhost:4400/class/delete`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: localStorage.getItem("userId"),
                index: index
            })
        })
        const response = await res.json();
        if (response.success == true) {
            toast.success("Class Deleted Successfully");
            const temp = allClasses.filter((el, ix) => {
                return ix != index
            })
            setAllClasses(temp);

        }
        else {
            toast.error(response.message)
        }
    }

    async function handleEdit() {
        const res = await fetch("http://localhost:4400/class/edit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: localStorage.getItem("userId"),
                index: editClassIndex,
                updatedClassName: className,
                updatedClassSubjects: classSubjects
            })
        })
        const response = await res.json();
        if (response.success) {
            toast.success("Class Updated Successfully");
            const temp = [...allClasses];
            temp[editClassIndex] = { className: className, subjects: classSubjects };
            setAllClasses(temp);
        }
        else {
            toast.error(response.message);
        }
        setShowPopUp(false);
    }

    return <>
        <section id="manage-classes" className="w-screen h-screen flex font-sans">

            <AdminHeader className="w-fit" />

            <div id="main-classes" className="flex-1 overflow-auto bg-gray-200">

                <div className="logo text-5xl font-sans tracking-tight font-light bg-white w-full p-3 flex justify-between border-b border-gray-300">SMART ED</div>

                <div className="flex flex-col items-center gap-10 min-h-screen p-10">

                    <h1 className="text-5xl font-sans tracking-tight font-thin">MANAGE CLASSES</h1>

                    {showPopUp ? <div id="add-class-pop-up" className="w-full font-sans" onClick={() => {
                        setShowPopUp(false);
                    }}>
                        <div className="flex flex-col gap-4 p-6 rounded-lg bg-white w-full" onClick={(e) => e.stopPropagation()}>

                            <h1 className="text-2xl flex self-center">{isEditMode ? "Edit Class" : "Add Class"}</h1>

                            <div className="flex gap-4 items-center text-xl">
                                <span>Class : </span>
                            <input type="text" className="border-b flex-1 px-2 py-1 outline-none" placeholder="Enter Class Name" value={className} onChange={(e) => {
                                setClassName(e.target.value)
                            }} />
                            </div>

                            <div id="pop-up-class-subjects" className="flex text-xl gap-4 rounded-lg w-fit p-2">
                                <span>Select subjects for class : </span>
                                {allSubjects.map((el) => {
                                    return <label key={el}>
                                        <input type="checkbox" checked={
                                            classSubjects.includes(el)
                                        } onChange={() => {
                                            if (classSubjects.includes(el)) {
                                                //Remove el (Subject)
                                                const temp = classSubjects.filter((el2) => el != el2);
                                                setClassSubjects(temp);
                                            }
                                            else {
                                                //Add el (Subject)
                                                const temp = [...classSubjects];
                                                temp.push(el);
                                                setClassSubjects(temp);
                                            }
                                        }} />
                                        <span>{el}</span>
                                    </label>
                                })}
                            </div>

                            <div className="flex self-center gap-5 mt-4 mb-1 ">
                            <button id="btn-class" className="px-5 py-3 rounded-full bg-gray-700 hover:scale-105 hover:cursor-pointer transition-all duration-200 text-white hover:bg-gray-300 hover:text-black cursor-pointer" onClick={() => {
                                if (isEditMode) {
                                    handleEdit();
                                }
                                else {
                                    handleSubmit();
                                }
                            }}>{isEditMode ? "Update Class" : "Add Class"}
                            </button>
                            <button className="px-5 py-3 rounded-full bg-gray-700 hover:scale-105 hover:cursor-pointer transition-all duration-200 text-white hover:bg-gray-300 hover:text-black cursor-pointer" onClick={() => { setShowPopUp(false) }}>
                                    Go Back
                                </button>
                            </div>
                            
                        </div>
                    </div> : ""}

                    <div className="w-full flex justify-end items-center">
                        <button className="px-4 py-2 rounded-full bg-gray-700 hover:scale-105 hover:cursor-pointer transition-all duration-200 text-white hover:bg-gray-300 hover:text-black cursor-pointer" onClick={() => {
                            setClassName("");
                            setClassSubjects([]);
                            setIsEditMode(false);
                            setShowPopUp(true)
                        }}>Add Class+</button>
                    </div>

                    <div id="classes-card" className="border p-6 rounded-lg bg-white w-full grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6">

                        {allClasses.map((el, ix) => {
                            return <div key={ix} className="classes border p-4 rounded-lg bg-gray-900 text-white font-serif flex h-40 hover:bg-gray-700 hover:scale-110 hover:cursor-pointer transition-all duration-200 flex-col text-xl gap-2 relative" onClick={() => {setShowEditDelete(showEditDelete == ix ? -1 : ix)}}>

                                {showEditDelete == ix ? <div id="edit-delete-class" className="flex gap-2 text-4xl absolute bottom-0 right-0 p-5">
                                    <FaRegEdit id="edit-class-icon" className="text-blue-500" onClick={() => {
                                        setEditClassIndex(ix);
                                        setClassName(el.className);
                                        setClassSubjects(el.subjects)
                                        setIsEditMode(true);
                                        setShowPopUp(true);
                                    }}></FaRegEdit>
                                    <MdDelete id="delete-class-icon" className="text-red-500" onClick={() => {
                                        handleDelete(ix);
                                    }}></MdDelete>
                                </div> : ""}

                                <div id="class-name">
                                    <h1 className="text-3xl">Class : {el.className}</h1>
                                </div>

                                <div id="class-subjects" className="flex gap-4">
                                    {el.subjects.map((el2, ix2) => {
                                        return <span key={ix + "" + ix2}>{el2}</span>
                                    })}
                                </div>

                            </div>
                        })}
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default ManageClasses;




