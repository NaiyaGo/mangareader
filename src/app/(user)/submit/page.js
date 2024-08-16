'use client';
import dynamic from 'next/dynamic';
import { useState, useMemo, useCallback } from 'react';
import 'easymde/dist/easymde.min.css'; // 导入 SimpleMDE 的样式
import { supabase } from '@/lib/supabase';  // 确保路径正确
import { useRouter } from 'next/navigation';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

export default function WritePage() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const router = useRouter();
  const delay = 3000;
  const autosavedValue = localStorage.getItem(`smde_demo`) || "Initial value";
  const handleEditorChange =useCallback( (value) => {
    console.log(value);
    setContent(value); // 实时更新 content 状态
  },[]);
  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
        autosave: {
        enabled: true,
        uniqueId: "demo",
        delay,
      },
      autofocus: true,
      spellChecker: false,
      
    };
  }, [delay]);
  const handleSave = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Title and content are required!');
      return;
    }

    console.log(content);
    console.log(title);
    
    if (error) {
      console.error('Error saving article:', error);
    } else {
      console.log('Article saved:', data);
      router.push('/'); // 跳转到文章列表页面
    }
  };

  return (
    <div className='flex flex-col h-screen w-screen  items-center font-bold '>
      <h1 className=''>Write a New Article</h1>
      <div className='flex felx-row items-center justify-start border-x-8 border-red-300 mb-4'>
      <label htmlFor='article-title'>Your Article</label>
      <input 
        id='article-title'
        type="text"
        value={title}
        onChange={(e) => {e.stopPropagation();setTitle(e.target.value)}}
        placeholder="Article Title"
        required
        className="title-input"
      />
      </div>
      <div className='flex flex-row '>
      <SimpleMDE
        value={content}
        onChange={handleEditorChange}
        options={autofocusNoSpellcheckerOptions}
      />
      </div>
      <button onClick={handleSave}>Save Article</button>
    </div>
  );
}
