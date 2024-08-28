//"use client"
//import Image from "next/image";
'use server'
import Sidebar  from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import ToolGrid from "@/components/ToolGrid";
//import ToolCard from "@/components/ToolCard";

export default async function Home({searchParams}) {

  //console.log(await supabase.from('card').select('*,category!inner(*)').eq('category.cate_name','Just-Share'));


  return (

        <div className="flex">
          <Sidebar />
          <div className="flex-1 clearfix">
          <MainContent />
          <ToolGrid  />
          </div>
        </div>
   
  );
}
