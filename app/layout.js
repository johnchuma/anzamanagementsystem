"use client"
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";

import { getUser } from "./utils/local_storage";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";
import { getMyInfo } from "./controllers/user_controller";

export default function RootLayout({children}) {
 const user = getUser()
 const router  =useRouter()
 
  return (
    <html  lang="en">
      <body suppressHydrationWarning={true}>
       {children}
      </body>
    </html>
  );
}
