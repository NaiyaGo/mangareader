"use server"
import React from 'react';
import SubmitButton from './submitButton';
import Link from 'next/link';
import { replaceCate } from '@/lib/replaceCate';
import {promises as fs} from 'fs';
export async function getCategories() {
  "use server"

  const file=await fs.readFile(process.cwd()+'/public/SidebarData.json', 'utf8');
  const categoryData=JSON.parse(file);

  return categoryData.map((category) => {
    return {
        cate_name:category.cate_name,
      };
  });
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