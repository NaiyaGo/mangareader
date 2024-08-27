"use client"
import Link from "next/link";
import { useAuth } from "@/context/authContext";
//import { useState } from "react";
//import { useEffect } from "react";

export default  function AuthButton() {
  //console.log("IN AuthButton");
  const { user, signOut } = useAuth();
  //console.log("useAuth AuthButton");
  return user ? (
    <div className="flex items-center gap-4">
        <p>  {user.email}
        </p>
        <button className="py-2 px-4 rounded-md no-underline bg-indigo-500 hover:bg-indigo-300"
        onClick={signOut}>
          Logout
        </button>
    </div>
    ) :(
    <div className="flex justify-end">    
            <Link
            href="/signIn"
            className="py-2 px-3 inline-flex  rounded-md no-underline bg-indigo-500 hover:bg-indigo-300"
            >
            Login
            </Link>
    </div>

    );

}