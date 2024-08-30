"use server"
import ToolCard from "@/components/ToolCard";
import { createClient } from "@/lib/client";

export default async function ToolGrid({selectedOption=''}) {

  

    //console.log("toolgrid",await supabase.from('card').select('*'));
    //console.log("toolgrid",await supabase.from('carddescription').select('*'));
  
    
      const supabase = createClient();
      let tools=[];
      if (selectedOption === '') {
        const response = await supabase.from('card').select(`
          *,
          carddescription(
            page_intro
          ),
          category(
            cate_name
          )
        `);
        tools = response.data;
      } else {
        const selectedCate = decodeURIComponent(selectedOption);
        const response = await supabase.from('card').select(`
          *,
          carddescription!inner(
            page_intro
          ),
          category!inner(
            cate_name
          )
        `).eq('category.cate_name', selectedCate);
        tools = response.data;
      }
      
   
  //console.log(tools);
    //console.log(tools);
    // const typedes=data[0].carddescription;
    // const typecate=data[0].category;
    // console.log('des',typedes);
    // console.log('cate',typecate);
    // tool.des[0].page
   //console.log(data);
      
      console.log('tools.length:',tools.length," typeof:",typeof tools.length);
    {
      return (tools.length===0?<div className="flex items-center justify-center min-h-full text-5xl font-extrabold text-rose-500 font-mono">
        More tools are coming soon!
      </div> :(
        

        <div className="px-2 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6  bg-slate-200 bg-opacity-50">
          {tools.map((tool, index) => {
        //console.log(tool);
            return(
              <div key={index} className="h-auto ">
              <ToolCard  tool={tool}  />
              </div>
            );
          }
          )}
        </div>
   
    ));
  }
}