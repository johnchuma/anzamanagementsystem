"use client"
import { deleteProgram, getProgram } from "@/app/controllers/program_controller";
import { useContext, useEffect, useState } from "react";
import Link from "next/link"
import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";
import Breadcrumb from "../../../../component/Breadcrumb";
import { timeAgo } from "@/app/utils/time_ago";
import { UserContext } from "@/app/(dashboard)/layout";
// import {Breadcrumb} from "@/app/component/Breadcrumb"
const Page = ({params}) => {
    const uuid = params.uuid
    const router = useRouter()
    const {userDetails}= useContext(UserContext)
    const [program, setProgram] = useState(null);
    const [loading, setloading] = useState(true);
  useEffect(() => {
        getProgram(uuid).then((data)=>setProgram(data))
    }, []);

    return ( program&&<div>
               <Breadcrumb prevLink={``} prevPage="Programs" pageName="Program details" />
         <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
      <div className="grid grid-cols-1 gap-y-4">
    {[
        {title:"Program title",value:program.title},
        {title:"Program description",value:program.description},
        {title:"Published",value:timeAgo(program.createdAt)},

   
].map((item,key)=>{
        return <div className="flex" key={key}>
            <div className="w-4/12">
                {item.title}:
            </div>
            <div className="w-8/12 text-black">
                {item.value}
            </div>

        </div>
    })}
</div>
       {program.applied == 0 && userDetails.role!="Admin" &&
        <div className="flex mt-5">
        <Link href={`/sendProgramApplication/${program.uuid}`} className="py-3 px-4 bg-primary 
        rounded hover:opacity-95 text-white mt-3 ">Apply to program</Link>
        </div>
       }
       {userDetails.role == "Admin"&&<div>
       <div className="flex mt-5 space-x-4">
        <Link href={`/editProgram/${program.uuid}`} className="py-3 px-4 bg-primary 
        rounded hover:opacity-95 text-white">Edit</Link>
        <div onClick={()=>{
            deleteProgram(program.uuid).then((item)=>{
                router.back()
            })
        }} className="py-3 px-4 bg-danger hover:opacity-95 cursor-pointer text-white rounded">Delete</div>
        </div>
        </div>}
      </div>
      
      </div>
    </div> );
}

export default Page;