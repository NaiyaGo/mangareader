
/**request对象是一个NextR equest对象，它是Web Request的扩展API。 
 * NextRequest使您可以进一步控制传入的请求，包括轻松访问cookies和扩展的、已解析的 URL 对象nextUrl  */
"use server"


async function getAccessToken() {
  console.log("use getToken");
  const response=await fetch('https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + process.env.AK + '&client_secret=' + process.env.SK,{
    method: 'POST',
    headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
        }
  }); 

  if(!response.ok){
    return new Response(JSON.stringify({error: 'Failed to get access token'}), {
      headers: { 'content-type': 'application/json' },
      status:500
    });
  }
  {/** */}
  const data=await response.json();
  const access_token=data.access_token;
  console.log("retreived access token: "+access_token);
  return access_token
}
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
  console.log('接收到发来的OCR请求\n','-----');
  const {imageBase64}=await request.json();
  console.log('type of imageBase64:',typeof imageBase64);
  //console.log('imageBase64:',imageBase64);
  const params = new URLSearchParams();
  params.append('image', imageBase64);
  params.append('language_type', 'auto_detect');
  params.append('detect_direction', 'true');
  params.append('paragraph', 'false');
  params.append('probability', 'false');
  params.append('multidirectional_recognize', 'false');
    const access_token=await getAccessToken();
    console.log('access_token:',access_token);
    const response=await fetch('https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic?access_token=' +access_token ,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: params
      });
  if(!response.ok){
    console.log('OCR failed');
    return new Response(JSON.stringify({error: 'OCR failed'}), {
      headers: { 'content-type': 'application/json' },
      status:500
    });
    
  }
    const OCRresult=await response.json();
    //console.log('OCRresult:',OCRresult);
    return new Response(JSON.stringify(OCRresult), {
      headers: { 'content-type': 'application/json' },
      status:200
    });
}
 
export async function PUT(request) {}
 
export async function DELETE(request) {}
 
export async function PATCH(request) {}