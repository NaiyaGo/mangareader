
/**request对象是一个NextR equest对象，它是Web Request的扩展API。 
 * NextRequest使您可以进一步控制传入的请求，包括轻松访问cookies和扩展的、已解析的 URL 对象nextUrl  */
"use server"
import {uploadImage} from '@/lib/cloudinary';
export async function GET(request) {

    // 从请求对象中获取URL
    const url = new URL(request.url);
    // 从URL中获取查询参数
    const params = url.searchParams;
    // 从查询参数中获取name参数
    // console.log(request);
    // console.log(url);
    // console.log(params);
    
    const name = params.get('name') || 'World';
    // 返回一个包含name参数的JSON对象
    return new Response(JSON.stringify({ greeting: `Hello ${name}!` }), {
      headers: { 'content-type': 'application/json' },
    });

}
 
export async function HEAD(request) {}
 
export async function POST(request) {

}
 
export async function PUT(request) {}
 
export async function DELETE(request) {}
 
export async function PATCH(request) {}