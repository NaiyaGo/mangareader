
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
    const file=await fs.readFile('/SidebarData.json', 'utf8');
    const categoryData=JSON.parse(file);

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