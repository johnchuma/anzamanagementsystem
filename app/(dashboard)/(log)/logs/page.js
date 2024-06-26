"use client"
import { useContext, useEffect, useState } from "react";
import { deleteUser, getAllUsers, updateUser } from "../../../controllers/user_controller"
import {timeAgo} from "../../../utils/time_ago"
import Link from "next/link"
import Loader from "@/components/common/Loader";

import toast from "react-hot-toast"
import NoData from "@/app/component/noData";
import Spinner from "@/components/spinner";
import { getLogs } from "@/app/controllers/log_controller";

const Page = () => {
  const [users, setUsers] = useState([]);
  const [ShowOptions, setShowOptions] = useState(false);
const [refresh, setRefresh] = useState(0);
  const [loading, setloading] = useState(true);
const [total, settotal] = useState(0);
const [limit, setlimit] = useState(7);
const [currentPage, setcurrentPage] = useState(1);
const [selectedItem, setselectedItem] = useState(null);
const [totalPages, settotalPages] = useState(1);
const [activating, setactivating] = useState(false);
const [deleting, setdeleting] = useState(false);



  useEffect(() => {
        getLogs(currentPage,limit).then((body)=>{
          setloading(false)
            settotal(body.count)
            setcurrentPage(body.page)
            settotalPages(body.totalPages)
            setUsers(body.data)
        })
  }, [refresh]);
    return  loading?<Loader/>: (
      <div className="">
    <div>
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Logs
        </h4>
      </div>
    {
      users.length<1?<NoData/>:<div>
<div className="grid grid-cols-6 border-t border-stroke py-4.5  dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Created </p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">User name</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">User role</p>
        </div>
       
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Action</p>
        </div>
       
      </div>

      {users.map((item, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
            {timeAgo(item.createdAt)}
            </p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {item.User.name}
            </p>
          </div>
        
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">{item.User.role}</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">{item.action}</p>
          </div>
        
        
        </div>
      ))}
      </div>
    }
      
      <div  className="flex px-5 py-8 justify-between">
        <div>Page {currentPage} of {totalPages} pages</div>
        <div className="flex space-x-3 ">
         <div onClick={()=>{
          if(currentPage >1){
            setcurrentPage(currentPage-1)
            setRefresh(refresh+1)
          }
         }} className="ring-1 ring-stroke hover:bg-primary hover:text-white py-2 px-4 cursor-pointer rounded ">Prev</div>
         <div onClick={()=>{
          if(currentPage<totalPages){
            setcurrentPage(currentPage+1)
            setRefresh(refresh+1)
          }
         }} className="ring-1 ring-stroke hover:bg-primary hover:text-white py-2 px-4 cursor-pointer rounded ">Next</div>
        </div>
      </div>
    </div>
       
       
    </div>
      </div>
   
    );
}
 
export default Page;