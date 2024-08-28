
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
    try {
      // 检查文件是否存在
      await fs.access(filePath, fs.constants.F_OK);
      console.log('File exists at build time');
  
      // 文件存在，读取文件内容
      const file = await fs.readFile(filePath, 'utf8');
      const categoryData = JSON.parse(file);
  
      return categoryData.map((category) => {
          return {
              slug: category.cate_name,
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
                  slug: category.cate_name,
              };
          });
      } catch (fetchError) {
          console.error('Error fetching data:', fetchError);
          return [];
      }
    }
  }



export default function CategoryPage({params,searmParams}) {
  
return (
    

    <ToolGrid selectedOption={params.slug} />
 
    );
}