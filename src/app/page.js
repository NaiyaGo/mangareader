//"use client"
//import Image from "next/image";
'use server'
import Sidebar  from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import ToolGrid from "@/components/ToolGrid";
//import ToolCard from "@/components/ToolCard";

export default async function Home({searchParams}) {

  //console.log(await supabase.from('card').select('*,category!inner(*)').eq('category.cate_name','Just-Share'));
  console.log('cwd=',process.cwd());
  function findFile(dirPath) {
    try {
        // 读取目录中的内容
        const items = fs.readdirSync(dirPath);
        
        for (const item of items) {
            const itemPath = path.join(dirPath, item);
            const stats = fs.statSync(itemPath);

            if (stats.isDirectory()) {
                // 如果是目录，则递归查找
                findFile(itemPath);
            } else if (item === targetFileName) {
                // 如果找到指定文件，输出其路径
                console.log(`找到文件: ${itemPath}`);
            }
        }
    } catch (error) {
        // 如果无法访问目录，则打印错误信息
        console.error(`无法访问: ${dirPath}`);
    } 
  }
  findFile('fileposData.json');
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
