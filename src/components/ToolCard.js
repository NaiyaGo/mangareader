
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
//import { useRouter } from 'next/router';
const ToolCard = ({ tool }) => {
   
  return (
    
    <div className='shadow-md'>
            
        <a className="text-blue-500 hover:underline" href={`/content/${tool.name}`} target="_blank" rel="noreferrer">
            <Image src={`/${tool.image}`} alt={tool.name}  width={500} 
          height={192}  className="lazyload w-full h-48 object-cover rounded-lg" />
        </a>
        
        <div>
            <div>                
                <p className="text-sm text-green-900 focus:text-red-600  antialiased"><a href={`/tool/${tool.name}`}>{tool.category}</a></p>    
            </div>
            <div>
                <p className="text-sm text-gray-600  antialiased"><Link href={`/tool/${tool.name}`}>{tool.description}</Link></p>
            </div>
        </div>
        
        
    </div>
   
    
  );
};

export default ToolCard;