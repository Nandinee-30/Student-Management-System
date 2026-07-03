import Header from "../components/Header";
import "./Home.css"
import { MdDashboard } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { IoMdBookmarks } from "react-icons/io";
import Footer from "../components/Footer";

function Home() {
    return <>
        <Header />

        <div className="relative z-10 h-full w-full">

            <div class="relative h-full w-full bg-neutral-900">
                
                <div class="absolute inset-0 bg-fuchsia-400 bg-[size:20px_20px] opacity-20 blur-[100px]"></div>

                <section id="section1" className="mx-auto w-full font-sans shadow-lg h-screen p-10 flex justify-between items-center gap-10 bg-black relative z-10">
                    <div className="bg-[url(\school.jpg)] bg-cover bg-center opacity-30 absolute w-full h-full -z-10 left-0 right-0"></div>
                    <div className="items-start justify-center flex flex-col gap-5 p-5 w-full">
                        <div className="flex flex-col gap-3">
                            <span className='inline-flex items-center justify-center rounded-full border w-fit border-gray-800 bg-gray-950 px-10 py-3 text-xs font-medium text-gray-300 backdrop-blur-3xl'>
                                <span className='bg-gradient-to-t from-[#fff] to-[#8678f9] bg-clip-text text-transparent text-6xl   font-sans font-bold tracking-wide flex items-center justify-center '>
                                    WELCOME
                                </span>
                            </span>
                            {/* <h1 className="text-6xl font-bold tracking-wide text-white">TO SCHOOL MANAGEMENT SYSTEM</h1> */}
                            <span className='bg-gradient-to-t from-[#c7d2fe] to-[#8678f9] bg-clip-text text-transparent text-6xl font-bold tracking-wide'>
                                TO SCHOOL MANAGEMENT SYSTEM
                            </span>
                        </div>
                        <p className="text-xl tracking-wider text-white">Manage Your school teachers, students, subjects and classes at one place. Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, dicta?</p>
                    </div>
                    <div className="w-[40%] items-center justify-center flex overflow-hidden shrink-0">
                        {/* <img src="\school.jpg" alt="school" className=""/> */}
                    </div>

                </section>

                <section id="section2" className="flex flex-col font-sans mx-5 mt-10 justify-center items-center p-10 gap-10 relative z-10">
                    <h1 className="text-4xl text-white font-bold font-sans tracking-tight">WHY CHOOSE US ?</h1>
                    <div className="flex justify-around items-center mt-10 gap-10 flex-wrap p-5 w-full">

                        <div className='relative h-80 min-w-sm overflow-hidden rounded-xl border border-gray-800 p-[1px] backdrop-blur-3xl hover:scale-105 transition-transform duration-300'>
                            <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]'></span>
                            <div className='inline-flex flex-col h-full w-full items-center justify-center rounded-xl bg-gray-950 px-3 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl gap-3'>
                                <MdDashboard style={{ fontSize: "80px" }} />
                                <h1 className="text-2xl">Manage your whole school</h1>
                            </div>
                        </div>

                        <div className='relative h-80 min-w-sm overflow-hidden rounded-xl border border-gray-800 p-[1px] backdrop-blur-3xl hover:scale-105 transition-transform duration-300'>
                            <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]'></span>
                            <div className='inline-flex flex-col h-full w-full items-center justify-center rounded-xl bg-gray-950 px-3 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl gap-3'>
                                <FaClock style={{ fontSize: "80px" }} />
                                <h1 className="text-2xl">Mark attendence</h1>
                            </div>
                        </div>

                        <div className='relative h-80 min-w-sm overflow-hidden rounded-xl border border-gray-800 p-[1px] backdrop-blur-3xl hover:scale-105 transition-transform duration-300'>
                            <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]'></span>
                            <div className='inline-flex flex-col h-full w-full items-center justify-center rounded-xl bg-gray-950 px-3 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl gap-3'>
                                <IoMdBookmarks style={{ fontSize: "80px" }} />
                                <h1 className="text-2xl">Upload marks of students</h1>
                            </div>
                        </div>

                    </div>
                </section>

            </div>
            
        </div>

        <Footer/>
    </>
}

export default Home;