import { useState } from "react";
import AdminHeader from "../../components/AdminHeader"
import "./Dashboard.css";
import { useEffect } from "react";

function Dashboard() {
    const [data, setData] = useState({
        totalStudents: 0,
        totalTeachers: 0,
        totalSubjects: 0,
        totalClasses: 0
    })
    useEffect(() => {
        async function getData() {
            const res = await fetch(`http://localhost:4400/school/dashboard/${localStorage.getItem("userId")}`)
            const response = await res.json();
            setData(response?.data);
        }
        getData();
    }, [])
    return <>
    
        <div className="flex w-screen h-screen">

            <AdminHeader className="w-fit"/>

            <div className="min-h-screen flex flex-col gap-10 items-center flex-1 bg-gray-200 overflow-auto">
                
                <div className="logo text-5xl font-sans tracking-tight font-light bg-white w-full p-3 flex justify-between border-b border-gray-300">SMART ED</div>
                
                <h1 className="text-5xl font-sans tracking-tight font-thin">WELCOME ADMIN</h1>

                <div className="contaner w-full flex flex-wrap justify-center gap-10">
                    <div className="cards min-w-sm bg-white rounded-lg p-5 font-sans border-gray-800 border-2 h-40 hover:scale-105 hover:bg-gray-300 transition-all duration-200 flex flex-col">
                        <h1 className="text-xl font-serif">Faculty :</h1>
                        <h1 className="text-xl font-serif">{data.totalTeachers}</h1>
                    </div>
                    <div className="cards min-w-sm bg-white rounded-lg p-5 font-sans border-gray-800 border-2 h-40 hover:scale-105 hover:bg-gray-300 transition-all duration-200 flex flex-col">
                        <h1 className="text-xl font-serif">Students :</h1>
                        <h1 className="text-xl font-serif">{data.totalStudents}</h1>
                    </div>
                    <div className="cards min-w-sm bg-white rounded-lg p-5 font-sans border-gray-800 border-2 h-40 hover:scale-105 hover:bg-gray-300 transition-all duration-200 flex flex-col">
                        <h1 className="text-xl font-serif">All Classes :</h1>
                        <h1 className="text-xl font-serif">{data.totalClasses}</h1>
                    </div>
                    <div className="cards min-w-sm bg-white rounded-lg p-5 font-sans border-gray-800 border-2 h-40 hover:scale-105 hover:bg-gray-300 transition-all duration-200 flex flex-col">
                        <h1 className="text-xl font-serif">All Subjects :</h1>
                        <h1 className="text-xl font-serif">{data.totalSubjects}</h1>
                    </div>
                </div>

            </div>

        </div>
    </>
}

export default Dashboard;