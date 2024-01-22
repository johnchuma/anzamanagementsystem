"use client"
import { addProgramRequirements, deleteProgramRequirement, editProgram, getProgram } from "@/app/controllers/program_controller";
import { useEffect, useState } from "react";
import Link from "next/link"
import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/app/component/Breadcrumb";
import toast from 'react-hot-toast';
import Spinner from "@/components/spinner";

// import {Breadcrumb} from "@/app/component/Breadcrumb"
const Page = ({params}) => {
    const [fields, setFields] = useState([]);
    const [requirement, setRequirement] = useState("");
    const router = useRouter()
    const uuid = params.uuid
    const [refresh, setrefresh] = useState(0);
    // const {userDetails}= useContext(UserContext)
    const [program, setProgram] = useState(null);
    const [loading, setloading] = useState(false);
  useEffect(() => {
        getProgram(uuid).then((data)=>{
            setProgram(data)

        })
    }, [refresh]);
    return ( program&& <div>
      
               <Breadcrumb prevLink={``} prevPage="Programs" pageName="New program" />
         <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 space-y-4 ">
        <h4 className="text-xl font-semibold text-black dark:text-white">
           Edit program
        </h4>
        <form onSubmit={(e)=>{
             e.preventDefault();
            setloading(true)
            const data = {
                type:e.target.type.value,
                title:e.target.title.value,
                description:e.target.description.value,
                // requirements:fields
             }
        editProgram(program.uuid, data).then(()=>{
            toast.success("Updated successfully")
            setloading(false)

           })
           addProgramRequirements(program.uuid,{requirements:fields})
        }}>
        <div className="grid grid-cols-2 gap-x-3">
            <div>
            <label className="mb-2.5 block font-medium text-black dark:text-white">
            Program title
            </label>
         <input name="title" defaultValue={program.title} className="w-full rounded border-stroke" placeholder="Enter program title"/>

            </div>
            <div>
            <label className="mb-2.5 block font-medium text-black dark:text-white">
             Program type
            </label>
            <select name="type" defaultValue={program.type} className="w-full rounded border-stroke" placeholder="">
            <option>Select program type</option>
            <option value="bfa">Business foundation accelerator</option>
            <option value="ira">Investment Readiness Accelerator</option>
           </select>
            </div>
        
         </div>
         <div className="mt-3">
         <label  className="mb-2.5 block font-medium text-black dark:text-white">
             Program description
            </label>
         <textarea defaultValue={program.description} name="description" placeholder="Write description" className="border-stroke w-full rounded"></textarea>

         </div>
         <div className="pt-3">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
            Add list of required documents
            </label>
            <div className="flex space-x-4">
        
            <input placeholder="Required field" value={requirement} onChange={(e)=>{
                setRequirement(e.target.value)
            }} className="w-full border-stroke rounded"/>  <div 
                onClick={()=>{ 
                    if(requirement != ""){
                        fields.push(requirement)
                        setFields(fields)
                        setRequirement("")
                    }
                    else{
                        toast.error("Enter field first")
                    }
                }} className="py-2 px-3 rounded bg-primary text-white">Add</div>

        </div>
            </div>
        
        <div className="space-y-2 py-4">
        {program.ProgramRequirements.map((item,index)=><div className="text-black flex space-x-1" key={item}>
            <div className="font-bold">{index+1}.</div>
            <div>{item.name}</div>
            <div className="cursor-pointer" onClick={()=>{
               deleteProgramRequirement(item.uuid).then(()=>{
                setrefresh(refresh+1)
               })
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="w-6 h-6 hover:text-danger">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            </div>
           </div>)}
           {fields.map((item,index)=><div className="text-black flex space-x-1" key={item}>
            <div className="font-bold">{index+program.ProgramRequirements.length+1}.</div>
            <div>{item}</div>
            <div className="cursor-pointer" onClick={()=>{
              let array = fields.filter((item)=>item != item)
              setFields(array)
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="w-6 h-6 hover:text-danger">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            </div>
           </div>)}
        </div>
     <button type="submit" className="py-2 px-3 rounded justify-center flex bg-primary text-white">
        {loading?<Spinner/>:"Publish program"}
        </button>
       
        </form>
        
      

      </div>
      </div>

    </div> );
}
 
export default Page;