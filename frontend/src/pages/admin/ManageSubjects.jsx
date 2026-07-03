import { useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import { toast } from "react-hot-toast"
import "./ManageSubjects.css"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect } from "react";
function ManageSubjects() {
    const [showpopup, setShowPopUp] = useState(false);
    const [subjectName, setSujbectName] = useState("");
    const [allSubjects, setAllSubjects] = useState([]);
    const [selected, setSelected] = useState(-1);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editSubjectIndex, setEditSubjectIndex] = useState(-1);
    useEffect(() => {
        async function getSubjects() {
            const res = await fetch(`http://localhost:4400/subject/${localStorage.getItem("userId")}`)
            const response = await res.json();
            // console.log(response);
            setAllSubjects(response.data);
        }
        getSubjects();
    }, [])

    //Function to add subject
    async function handleSubmit() {
        if (subjectName != "") {
            const res = await fetch("http://localhost:4400/subject/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subjectName: subjectName, userId: localStorage.getItem("userId") })
            })
            const response = await res.json();
            if (response.success) {
                toast.success("Subject Added Successfully");
                const temp = [...allSubjects];
                temp.push(subjectName);
                setAllSubjects(temp);
            }
            else {
                console.log(response);
                toast.error(response.message);
            }
            setSujbectName("");
            setShowPopUp(false);
        }
    }

    //Delete Function to delete Subject
    async function handleDelete(subjectName) {
        const res = await fetch("http://localhost:4400/subject/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ subjectName: subjectName, userId: localStorage.getItem("userId") })
        })
        const response = await res.json();
        if (response.success) {
            toast.success("Subject Deleted Successfully");
            let temp = [...allSubjects];
            temp = temp.filter((el) => el != subjectName);
            setAllSubjects(temp);
        }
        else {
            toast.error(response.message);
            console.log(response);
        }
    }

    //Edit Function to edit Subject
    async function handleEdit() {
        const res = await fetch("http://localhost:4400/subject/edit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                editIndex: editSubjectIndex,
                updatedName: subjectName,
                userId: localStorage.getItem("userId")
            })
        })
        const response = await res.json();
        if (response.success) {
            toast.success("Subject Updated Successfully");
            setShowPopUp(false);
            const temp = [...allSubjects];
            temp[editSubjectIndex] = subjectName;
            setAllSubjects(temp);
        }
        else {
            toast.error(response.message);
        }
    }

    return <>

        <div id="subjects-main" className="w-screen h-screen flex font-sans">

            <AdminHeader className="w-fit" />

            <div className="flex-1 overflow-auto bg-gray-200">

                <div className="logo text-5xl font-sans tracking-tight font-light bg-white w-full p-3 flex justify-between border-b border-gray-300">SMART ED</div>

                <div className="flex flex-col items-center gap-10 min-h-screen p-10">

                    <h1 className="text-5xl font-sans tracking-tight font-thin">MANAGE SUBJECTS</h1>

                    {showpopup ? <div id="add-subject-pop-up" className="w-full font-sans" onClick={() => { setShowPopUp(false) }}>

                        <div id="add-subject-box" className="flex flex-col gap-4 p-6 rounded-lg bg-white w-full" onClick={(e) => { e.stopPropagation() }}>

                            <h1 className="text-2xl flex self-center">{isEditMode ? "Edit Subject" : "Add New Subject"}</h1>

                            <div className="flex gap-4 items-center">
                                <span>Subject : </span>
                                <input type="text" placeholder="Enter Subject Name" className="border-b flex-1 px-2 py-1 outline-none" value={subjectName} onChange={(e) => {
                                    setSujbectName(e.target.value);
                                }}></input>
                            </div>

                            <div className="flex self-center gap-5 mt-4 mb-1 ">
                                <button className="px-10 py-3 rounded-full bg-gray-700 hover:scale-105 hover:cursor-pointer transition-all duration-200 text-white hover:bg-gray-300 hover:text-black cursor-pointer" onClick={() => {
                                    if (isEditMode) {
                                        handleEdit();
                                    }
                                    else {
                                        handleSubmit();
                                    }
                                }}>{isEditMode ? "Save" : "Add"}
                                </button>
                                <button className="px-5 py-3 rounded-full bg-gray-700 hover:scale-105 hover:cursor-pointer transition-all duration-200 text-white hover:bg-gray-300 hover:text-black cursor-pointer" onClick={() => { setShowPopUp(false) }}>
                                    Go Back
                                </button>
                            </div>

                        </div>

                    </div> : ""}

                    <div className="w-full flex justify-end items-center">
                        <button className="px-4 py-2 rounded-full bg-gray-700 hover:scale-105 hover:cursor-pointer transition-all duration-200 text-white hover:bg-gray-300 hover:text-black cursor-pointer" onClick={() => {
                            setSujbectName("");
                            setIsEditMode(false);
                            setShowPopUp(true)
                        }}>Add Subject+</button>
                    </div>


                    <div className="border p-6 rounded-lg bg-white w-full grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6">
                        {allSubjects.map((el, ix) => {
                            return <div key={ix} onClick={() => setSelected(selected == ix ? -1 : ix)} className="classes border p-4 rounded-lg bg-gray-900 text-white font-serif flex h-40 hover:bg-gray-700 hover:scale-110 hover:cursor-pointer transition-all duration-200 flex-col text-xl gap-2">

                                <div id="subject-card">
                                    <h1>{el}</h1>
                                </div>
                                
                                {selected == ix ? <div id="subject-actions" className="flex gap-2 text-3xl">
                                    <FaEdit className="text-blue-500" id="edit-icon" onClick={() => {
                                        setEditSubjectIndex(ix);
                                        setSujbectName(el);
                                        setIsEditMode(true);
                                        setShowPopUp(true);
                                    }} />
                                    <MdDelete className="text-red-500" id="delete-icon" onClick={() => {
                                        handleDelete(el);
                                    }} />
                                </div> : ""}
                            </div>
                        })}

                    </div>
                </div>
            </div>

        </div>


    </>
}

export default ManageSubjects;