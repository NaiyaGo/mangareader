
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
    let categoryData = null;
    try {
      const response = await fetch('/fileposData.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      categoryData = await response.json();
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }

    return categoryData.map((category) => {
      return {
          slug: category.cate_name,
        };
    });
  }



export default function CategoryPage({params,searmParams}) {
  
return (
    

    <ToolGrid selectedOption={params.slug} />
 
    );
}