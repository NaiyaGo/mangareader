
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { replaceCate } from '@/lib/replaceCate';
//import { useRouter } from 'next/router';
const ToolCard = ({ tool }) => {
  
  const displayName=replaceCate(tool.category.cate_name);
  return (
    
    <div className='shadow-md rounded-md'>
            
        <Link className="text-blue-500 " href={{pathname:`/content/${tool.cardname}`,query:{imgUrl:tool.image_url}}} >
            <Image src={`${tool.image_url}`} alt={tool.cardname}   width={500} 
          height={192}  className="lazyload w-full h-48 object-cover rounded-lg" />
        </Link>
        
        <div className='p-1'>
            <div>
                <p className="text-sm text-gray-600 antialiased "><Link href={`/content/${tool.cardname}`}>{tool.carddescription[0].page_intro}</Link></p>
            </div>
            <div>                
                <p className="inline-block rounded-lg  text-sm p-1 text-rose-300 bg-indigo-400 hover:text-white hover:bg-indigo-600 antialiased "><Link href={`/category/${tool.category.cate_name}`}>✧:{displayName}</Link></p>    
            </div>
            
        </div>
        
        
    </div>
   
    
  );
};

export default ToolCard;