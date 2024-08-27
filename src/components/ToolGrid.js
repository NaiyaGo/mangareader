"use server"
import ToolCard from "@/components/ToolCard";
import {createClient} from "@/lib/anoymous";

export default async function ToolGrid({selectedOption=''}) {
  
  
    //console.log("toolgrid",await supabase.from('card').select('*'));
    //console.log("toolgrid",await supabase.from('carddescription').select('*'));
  let tools=[];
  if(selectedOption===''){
    const supabase=createClient();
    const{ data}=await supabase.from('card').select(`
        *,
        carddescription(
          page_intro
        ),
        category(
          cate_name
        )
        `);
        //console.log("primary",data);
        tools = data || [];
        //console.log(tools);
    }
  else{
    const selectedCate=decodeURIComponent(selectedOption);
    const supabase=createClient();
    const{ data}=await supabase.from('card').select(`
        *,
        carddescription!inner(
          page_intro
        ),
        category!inner(
          cate_name
        )
        `).eq('category.cate_name',selectedCate);
        //console.log(selectedCate,data);

    tools = data || [];
    //console.log(tools);

  }
  //console.log(tools);
    //console.log(tools);
    // const typedes=data[0].carddescription;
    // const typecate=data[0].category;
    // console.log('des',typedes);
    // console.log('cate',typecate);
    // tool.des[0].page
   //console.log(data);
   if(tools.length===0){
      return (
      <div className="flex items-center justify-center ">
        <p className="font-serif text-xl font-semibold">More Content waiting to be added</p>
      </div>
    );

   }else
    {
      return(
        <div className="px-2 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool, index) => {
        //console.log(tool);
            return(
              <div key={index} className="h-auto ">
              <ToolCard  tool={tool} />
              </div>
            );
          }
      )}
    </div>
    );
  }
}