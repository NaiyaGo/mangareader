
import ToolGrid from "@/components/ToolGrid";
import {promises as fs} from 'fs';
// export async function generateMetadata({ params }) {
//     const file=await fs.readFile(process.cwd()+'/src/SidebarData.json','utf-8');
//     const categoryData=JSON.parse(file);
    
    
    
    
//     return {
//       title: {categoryData},
     
//     }
//   }

  export async function generateStaticParams() {
    console.log('Looking for file at:', process.cwd()+'/public/SidebarData.json');
    const filePath=process.cwd()+'/public/SidebarData.json';
    if(fs.existsSync(filePath)){
      console.log('file exists');
      const file=await fs.readFile( process.cwd()+'/public/SidebarData.json', 'utf8');
      const categoryData=JSON.parse(file);

    return categoryData.map((category) => {
      return {
          slug: category.cate_name,
        };
    });
    }else{
      console.log('Detect Runtime phase:', 'use fetch instead');
      try {
        const response = await fetch('/SidebarData.json'); // 确保文件在 public 目录
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const categoryData=data.map((category) => {
          return {
              slug: data.cate_name,
            };
        });
        return categoryData;
      } catch (error) {
          console.error('Error fetching data:', error);
          return [];
      }
    }
    
  }



export default function CategoryPage({params,searmParams}) {
  
return (
    

    <ToolGrid selectedOption={params.slug} />
 
    );
}