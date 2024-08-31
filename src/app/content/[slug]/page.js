import { createClient } from "@/lib/anoymous";
import Image from "next/image"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from 'rehype-raw';
import "@/app/styles/markdown.css";
//import Head from "next/head";


// export async function generateStaticParams() {
//   "use server"
//   const supabase=createClient();
//   const {data,error}=await supabase.from('card').select('cardname');
//   if(error){console.log(error);return [];}
//   return data.map((card)=>({slug:card.cardname}));
  
// }

export async function getPost(cardname) {
  "use server"
  const supabase=createClient();
  const {data,error}=(await supabase.rpc('get_blog_by_name',{q_name:cardname}));
  if(error){console.log(error);return null;}
  return data; 
}

export default async function Page({ params,searchParams }) {
  const {imgUrl}=searchParams;

  const data=await getPost(decodeURIComponent(params.slug));
  //console.log('print data');

  return (
    <div  className={`panel bg-rose-300 bg-opacity-50  w-full space-x-2  container mx-auto   flex` }>
      {/* 左侧边栏 */}
     

      {/* 主内容区域 */}
      <main className="flex-grow flex flex-col items-center">
        {/* <div className="w-full  px-4 ">
          <h1 className="text-left text-3xl font-bold mb-4 text-orange-400 ">{params.slug}</h1>
          <h2 className="">
           
            {data[0].post_des}
          </h2>
        </div>
         */}
        <div className="px-4 py-2  border-2 rounded-md border-stone-950">
          <Image
            
            src={imgUrl}
            alt={`${params.slug}`}
            width={500}
            height={350}
            
          />
        </div>
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{data[0].post_content}</ReactMarkdown>
        
        
        
      </main>

      {/* 右侧边栏 */}
      
      
     {/* {
       <aside className="w-1/6 bg-gray-200 p-4 border-black border-8">
       
        <p>右侧边栏内容</p>
        </aside>
     } */}
      
    </div>
  );
}