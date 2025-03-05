"use client"
import { useEffect,useState } from "react";
import { createClient } from "@/lib/client";
export default function DeleteButton({cardId}) {
    const [isAdmin, setIsAdmin] = useState(false);
    const handleClick=async (e)=>{
        e.stopPropagation();
        //console.log(e.target);
        //console.log('delete card_id: ',cardId);
        const {data,error}=await fetch('/api/supabase', {
            method: 'DELETE',
            headers:{ 'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({cardId:cardId}),
        });
        if(error){
            console.log("error:",error);
        }else{
            window.location.reload();
        }
    }
    
    useEffect(() => {
        const fetchUser=async()=>{
            const supabase = createClient();
            const { data, error } = await supabase.auth.getUser();
            if (data&&data.user) {
                //console.log(data);
                const userId = data.user.id;
                
                const is_admin= await supabase.from('users').select('is_admin').eq('id',userId);
                setIsAdmin(is_admin);
            }
        }
        fetchUser();
        
    },[]);
    return (
        isAdmin&&<button className='text-sm absolute inline-block right-0 text-rose-300 bg-indigo-400 hover:text-white hover:bg-indigo-500 antialiased rounded-lg p-1 ' onClick={handleClick}>Delete</button>
    )
}