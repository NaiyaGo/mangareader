//"use client"
//import Image from "next/image";
'use server'
import ToolGrid from "@/components/ToolGrid";
//import ToolCard from "@/components/ToolCard";
import "@/app/styles/home.css";
export default async function Home({searchParams}) {

  //console.log(await supabase.from('card').select('*,category!inner(*)').eq('category.cate_name','Just-Share'));


  return (
    <ToolGrid />
  );
}
