"use server"
import React from 'react';
import SubmitButton from './submitButton';
import Link from 'next/link';
import { replaceCate } from '@/lib/replaceCate';
import {promises as fs} from 'fs';
export async function getCategories() {
  "use server"
  console.log('Looking for file at:', process.cwd()+'/public/SidebarData.json');
  const filePath=process.cwd()+'/public/SidebarData.json';
  try {
    // 检查文件是否存在
    await fs.access(filePath, fs.constants.F_OK);
    console.log('File exists at build time');

    // 文件存在，读取文件内容
    const file = await fs.readFile(filePath, 'utf8');
    const categoryData = JSON.parse(file);

    return categoryData.map((category) => {
        return {
          cate_name: category.cate_name,
        };
    });
} catch (error) {
    console.log('File does not exist at build time or cannot be accessed. Switching to runtime fetch.');

    try {
        // 在运行时使用 fetch 获取数据
        const response = await fetch('/SidebarData.json'); // 确保文件在 public 目录
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        return data.map((category) => {
            return {
                cate_name: category.cate_name,
            };
        });
    } catch (fetchError) {
        console.error('Error fetching data:', fetchError);
        return [];
    }
  }
}
const Sidebar = async () => {
  
    // 如果 localStorage 中没有数据，则从服务器获取数据
    
  const categoryData=await getCategories();
  
  
  

  //console.log(categories);
  return (
    <div className="mt-1 ml-1 w-64 bg-white-200 shadow-md rounded-lg overflow-hidden flex flex-col h-screen sticky top-0">
      <div className="p-4  shadow-sm text-gray-700 flex space-x-1 justify-between items-center">
        <h2 className=" text-xl font-bold"><Link href={'/'}>Manga Reader</Link></h2>
        <SubmitButton />
      </div>
      <div className="overflow-y-auto flex-grow">
        <ul className="divide-y divide-gray-200">
          {categoryData?.map((category, index) => {
            const displayName=replaceCate(category.cate_name);
            return (
            <li key={index}  className="flex justify-between items-center p-4 hover:bg-gray-50 cursor-pointer text-xs">
              <span className="text-gray-700"><Link href={`/category/${category.cate_name}`}>{displayName}</Link></span>
              
            </li>);
    })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;