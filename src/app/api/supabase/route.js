
/**request对象是一个NextR equest对象，它是Web Request的扩展API。 
 * NextRequest使您可以进一步控制传入的请求，包括轻松访问cookies和扩展的、已解析的 URL 对象nextUrl  */
import { createClient } from "@/lib/anoymous";
export async function GET(request) {

    // 从请求对象中获取URL
    const url = new URL(request.url);
    // 从URL中获取查询参数
    const params = url.searchParams;
    // 从查询参数中获取name参数

    const name = params.get('name') || 'World';
    // 返回一个包含name参数的JSON对象
    return new Response(JSON.stringify({ greeting: `Hello ${name}!` }), {
      headers: { 'content-type': 'application/json' },
    });

}
 
export async function HEAD(request) {}
 
export async function POST(request) {
  // 从请求头中获取会话令牌
  
  // 使用 Supabase 验证令牌并获取用户信息
  const supabase=createClient();
  
  // 从请求体中获取表单数据
  const formData = await request.formData();
  const title = formData.get('title');
  const content = formData.get('content');
  const productDescription = formData.get('productDescription');
  const productIntro = formData.get('productIntro');
  const imageUrl = formData.get('imageUrl');
  const category = formData.get('category');
  const {data,error}=await supabase.rpc('post_blog',{image_url:imageUrl,cardname:title,cate_id:category,page_title:title,page_intro:productIntro,page_description:productDescription,content:content});
  if(error){
    console.log(error);
    return new Response('Internal Server Error', { status: 500 });
  }
  
  
  return new Response(`/content/${title}`, {
    headers: { 'content-type': 'text/plain' },
    status:200
  });
}
 
export async function PUT(request) {}
 
export async function DELETE(request) {}
 
export async function PATCH(request) {}