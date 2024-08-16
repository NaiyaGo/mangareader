//"use client"
//import Image from "next/image";
import Sidebar  from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import ToolCard from "@/components/ToolCard";

export const metadata = {
  title: "MangaReader - Tools for Manga Lovers",
  description: "MangaReader is a collection of tools for manga lovers. It includes manga readers, downloaders, and other tools to enhance your manga reading experience.",
};

export default async function Home() {
  const categories = [
    { name: 'Text to Speech Tools', count: 39 },
    { name: 'Art Generators', count: 126 },
    { name: 'Development Tools', count: 197 },
    { name: 'Video Makers', count: 197 },
    { name: 'Search Engines', count: 37 },
    { name: 'Fashion Tools', count: 16 },
    { name: 'No Code Tools', count: 165 },
    { name: 'Social Media Tools', count: 146 },
    { name: 'Logo Generators', count: 36 },
    { name: 'Fun Tools', count: 11 },
    { name: 'Dating Tools', count: 39 },
    { name: 'Data Processing Tools', count: 72 },
    { name: 'Summarizer Tools', count: 129 },
    { name: 'Avatar Generators', count: 96 },
    { name: 'Educational Tools', count: 284 },
    { name: 'Image Enhancer Tools', count: 98 },
    { name: 'Note Taking Tools', count: 15 },
    //-----
    { name: 'add 1', count: 165 },
    { name: 'add 2', count: 146 },
    { name: 'add 3', count: 36 },
    { name: 'add 4', count: 11 },
    { name: 'add 5', count: 39 },
    { name: 'add 6', count: 72 },
    { name: 'add 7', count: 129 },
    { name: 'add 8', count: 96 },
    { name: 'add 9', count: 284 },
    { name: 'add 10', count: 98 },
    { name: 'add 11', count: 15 },
    // 添加更多类别以测试滚动效果
  ];
  const tools = [
    {
      id:"1",  
      name: "character.ai",
      category: "Educational Tools",
      website: "https://character.ai",
      description: "Character.AI is a dynamic platform that enables users to create and interact with AI-powered characters.",
      image: "CardImages/1.png",
    },
    {
      id:"2",
      name: "Suno",
      category: "Music Tools",
      website: "https://suno.com",
      description: "Suno is an innovative platform designed to democratize music creation using AI.",
      image: "CardImages/2.png",
    },
    {
      id:"3",
      name: "s1",
      category: "Music Tools",
      website: "https://suno.com",
      description: "Suno is an innovative platform designed to democratize music creation using AI.",
      image: "CardImages/3.png",
    },
    {
      id:"4",
      name: "s2",
      category: "Music Tools",
      website: "https://suno.com",
      description: "Suno is an innovative platform designed to democratize music creation using AI.",
      image: "CardImages/4.png",
    },
    {
      id:"5",
      name: "s3",
      category: "Music Tools",
      website: "https://suno.com",
      description: "Suno is an innovative platform designed to democratize music creation using AI.",
      image: "https://example.com/suno.jpg"
    },
    {
      id:"6",
      name: "s4",
      category: "Music Tools",
      website: "https://suno.com",
      description: "Suno is an innovative platform designed to democratize music creation using AI.",
      image: "https://example.com/suno.jpg"
    },
    {
      id:"7",  
      name: "s5",
      category: "Music Tools",
      website: "https://suno.com",
      description: "Suno is an innovative platform designed to democratize music creation using AI.",
      image: "https://example.com/suno.jpg"
    },
    {
      id:"8",  

      name: "s6",
      category: "Music Tools",
      website: "https://suno.com",
      description: "Suno is an innovative platform designed to democratize music creation using AI.",
      image: "https://example.com/suno.jpg"
    },
    {
      id:"9",  

      name: "s7",
      category: "Music Tools",
      website: "https://suno.com",
      description: "Suno is an innovative platform designed to democratize music creation using AI.",
      image: "https://example.com/suno.jpg"
    },
    // ... 添加更多工具
  ];
  // console.log("-------------------------------");
  // console.log(await supabase.auth.getUser());
  // const { data, error } = await supabase.from('card').select();
  // console.log("-----------------------------");
  // if(error)console.log(error);
  // else
  // console.log( data);

  

  return (

        <div className="flex">
          <Sidebar categories={categories} />
          <div className="flex-1 clearfix">
          <MainContent />
            {/* 主要内容区域 */}
            {/* 工具卡片网格 */}
            <div className="px-2 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tools.map((tool, index) => (
                <ToolCard key={index} tool={tool} />
              ))}
            </div>
          </div>
        </div>
   
  );
}
