'use client'
import dynamic from 'next/dynamic';
import { useState, useMemo, useCallback,useEffect} from 'react';
import 'easymde/dist/easymde.min.css'; // 导入 SimpleMDE 的样式
import { Input } from '@/components/ui/Input';
import '@/app/styles/markdown.css';
//import { RadioGroup,RadioGroupItem } from '@/components/ui/radio-group';
import {Textarea} from '@/components/ui/Textarea';
import {uploadImage} from '@/lib/cloudinary';
import { createClient } from '@/lib/client';
import {marked} from 'marked';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { replaceCate } from '@/lib/replaceCate';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

async function transformImage(image) {
  //console.log(typeof image);
  const imageData = await image.arrayBuffer();
  const mime = image.type;
  const encoding = 'base64';
  const base64Data = Buffer.from(imageData).toString('base64');
  const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;
  return fileUri;
}

export default function WritePage() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [productIntro, setProductIntro] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(1);
  const [categories, setCategories] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  //const ref=useRef();
  const handleOptionChange = (e) => {
    // console.log('handleOptionChange e is',typeof e,":",e);
    // console.log('selectionedOption  is',typeof selectedOption,":",selectedOption);
    setSelectedOption(parseInt(e));
   
  };
  const delay = 10000;
  const handleSave = async (e) => {
   
    e.preventDefault();
    setLoading(false);
    setIsSubmitting(true);
    const fileUri= await transformImage(productImage);
    const imageUrl= await uploadImage(fileUri);
    const supabase = createClient();
    //const {data,error}=await supabase.auth.getSession();
    //const token=data?.session?.access_token;
    console.log(selectedOption);
    //console.log(imageUrl);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('productDescription', productDescription);
    formData.append('productIntro', productIntro);
    formData.append('imageUrl', imageUrl);
    formData.append('category', selectedOption);
    //console.log(formData);

    const response = await fetch('/api/supabase', {
      method: 'POST',
      headers: {'Authorization': `Bearer ${token}`},
      body: formData,
    });
    if (!response.ok) throw new Error('Network response was not ok');
    // 处理成功
    setLoading(true);
    setIsSubmitting(false);
  
  };
  const handleEditorChange =useCallback( (value) => {
    //console.log(value);
    setContent(value); // 实时更新 content 状态
    
  },[]);
  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
        autosave: {
        enabled: true,
        uniqueId: "demo",
        delay,
      },
      showIcons: ["strikethrough", "table", "code", "upload-image"],
      hideIcons: ["bold", "image"],
      autofocus: true,
      spellChecker: false,
      uploadImage: true,
      previewRender: (plainText) => {
        const rawHtml= marked(plainText); // 使用 marked 库将 Markdown 转换为 HTML
        return `<div class="panel">${rawHtml}</div>`; // 返回 HTML 字符串
      },
      imageUploadFunction: async (file,onSuccess,onError) => {
        
          const formData=new FormData();
          formData.append('file',file);
          formData.append('upload_preset','BlogPic');
          fetch('https://api.cloudinary.com/v1_1/daftrmk0g/image/upload',{
            method:'POST',
            body:formData,
          
          })
          .then(res=>res.json())
          .then(data=>{
            if(data.secure_url){
            onSuccess(data.secure_url);
            }else{
              onError("Error: No URL returned from server.");

            }
          }).
          catch((error)=>{
          onError("Error uploading image: " + error.toString());
        });
      },
      
    };
  }, []);
  useEffect(() => {
    
    const fetchCategory = async () => {
      const supabase=createClient();
      const {data,error}= await supabase.from('category').select('*');
      console.log(data);
      setCategories(data);

    };

  
    fetchCategory();


    
  },[]);
  //console.log(categories);
  //console.log(selectedOption);

  return (
    <div className='container my-2 rounded-lg mx-auto p-4 bg-white  '>
    <h1 className='text-2xl font-bold  mb-4'>Contribute to our collective resources</h1>
    <form className="" onSubmit={handleSave}>
      <div className='mt-4 '>
       <div className='flex space-x-4 '> 
        <div className='flex-1 '>
          <label htmlFor='article-title' className=' font-bold block rounded-lg '>Title</label>
          <Input 
            id='article-title'
            type="text"
            value={title}
            onChange={(e) => {e.stopPropagation();setTitle(e.target.value)}}
            placeholder="Article Title (no more than 60 characters)"
            required
            className="w-full"
          />
        </div>
        <div className='flex-1 flex-col items-center  '>
        <label htmlFor='cateList' className=' font-bold block rounded-lg '>Category</label>
          <Select id='cateList' value={selectedOption} onValueChange={handleOptionChange} required>
               
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category for your product" />
                  </SelectTrigger>
               
                <SelectContent>
                
                {
                  categories&&categories.map((category,index)=>{
                    return(
                      <SelectItem  key={index} value={category.id}>
                        
                          {replaceCate(decodeURIComponent(category.cate_name))}

                         
                      </SelectItem>
                    );
                  })  
                }   
               
                </SelectContent>
              </Select>
            {/* <label htmlFor='Category' className=' mt-4 font-bold rounded-lg '>Category</label>
            <RadioGroup id='Category' className='border rounded-lg p-4' value={selectedOption} onValueChange={handleOptionChange} required>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="o1" />
                <label htmlFor="o1">Just Share</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="o2" />
                <label htmlFor="o2">Text to Video</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="o3" />
                <label htmlFor="o3">Text to Image</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4" id="o4" />
                <label htmlFor="o4">AI Manga&Comic</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5" id="o5" />
                <label htmlFor="o5">AI Character</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="6" id="o6" />
                <label htmlFor="o6">Image to Video</label>
              </div>
            </RadioGroup> */}
        </div>
        </div>
      </div>
      <label htmlFor='product-description' className='block mt-4 font-bold rounded-lg '>Product Description</label>
      <Textarea
          id='product-description'
          placeholder="Product Description (no more than 160 characters)"
          value={productDescription}
          onChange={(e) => {e.stopPropagation();;setProductDescription(e.target.value);}}
          className="w-full"
          required
        />
      <label htmlFor='product-intro' className='block mt-4 font-bold rounded-lg '>Product Intro</label> 
        <Input
          id='product-intro'
          type="text"
          placeholder="Product Intro"
          value={productIntro}
          onChange={(e) => {e.stopPropagation();setProductIntro(e.target.value);}}
          className="w-full"
          required
        />
      <label htmlFor='product-image' className='block mt-4 font-bold rounded-lg '>Product Image</label>
      <Input
        id='product-image'
        type="file"
        accept=".png,.jepg,.jpg,.jfif,.webp"
        onChange={(e) => {e.stopPropagation();setProductImage(e.target.files[0])}}
        className="w-full cursor-pointer "
        required
      />
      <SimpleMDE
        value={content}
        onChange={handleEditorChange}
        options={autofocusNoSpellcheckerOptions}
        required
      />
      <button disabled={isSubmitting} type="submit" className="w-1/3  bg-orange-600 text-white font-bold rounded-lg p-2 ">Submit</button>
      </form>
      {loading && <p className="font-bold  text-green-600">Article saved successfully</p>}
    </div>
  );
}
