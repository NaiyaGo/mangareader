
import Image from "next/image"
//import Head from "next/head";
export const metadata = {
  title: "test title",
  description: "test description",
  type: "article",
  openGraph: {
    title: "test metadata.title",
    description: "test metadata.description",
    type: "article"
  }
};

export default function Page({ params }) {
  return (
    <div className="bg-black bg-opacity-50  w-full h-screen container mx-auto  px-4 py-2 flex border-red-400 border-8">
      {/* 左侧边栏 */}
      <aside className="w-1/6 bg-gray-200 p-4 border-red-400 border-8">
        {/* 这里可以添加左侧边栏内容 */}
        <p>左侧边栏内容</p>
      </aside>

      {/* 主内容区域 */}
      <main className="flex-grow flex flex-col items-center">
        <div className="w-full  px-4 ">
          <h1 className="text-left text-3xl font-bold mb-4 text-orange-400 ">{params.slug}</h1>
          <h2 className="">
            {/* 描述内容  */}
            <p>这是一个测试页面</p>
          </h2>
        </div>
        
        <div className="px-16 py-2 border-red-400 border-8">
          <Image
            
            src="/CardImages/1.png"
            alt={`${params.slug}`}
            width={700}
            height={350}
            className="sm:max-w-[400px] sm:min-w-[100px]
              md:max-w-[512px]   
              lg:max-w-[680px]   
              max-w-full"
          />
        </div>
        <article className="flex flex-grow bg-white border-4 border-pink-400">
        <p>dasdasdsdsadasdasdasda</p>
        <p>dasdasdsdsadasdasdasda</p>
        <p>dasdasdsdsadasdasdasda</p>
        
        </article>
        
      </main>

      {/* 右侧边栏 */}
      
      
     {/* {
       <aside className="w-1/6 bg-gray-200 p-4 border-black border-8">
       
        <p>右侧边栏内容</p>
        </aside>
     } */}
      
    </div>
  );
}