// pages/register.js
"use client"
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function Register() {
  const router=useRouter();
  const [formData, setFormData] = useState({
    
    email: '',
    password: ''
  });
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 处理表单提交逻辑，例如发送请求到API
    const { data, error } = await supabase.auth.signInWithPassword({
  email: formData.email,
  password: formData.password,
});
    if (error) {
      alert("error:"+error.message);
    } else {
      setSuccess(true);
      const { data, error } = await supabase.auth.getSession()
      //console.log(data);
      alert('登录成功!即将返回主页');
      setTimeout(() => {
        router.push('/');
      }, 3000);
  };}

  return (
    <div className='flex flex-col justify-center items-center min-h-screen border-black border-4'>
      <div className='w-1/4 text-center shadow-xl border-black border-2 rounded-md'>
        <h1 className='mb-4 text-xl text-center'>Welcome</h1>
        <form className='flex flex-col divide-y-4 > * + *' onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className=' p-2 border rounded'
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className=' p-2 border rounded'
            required
          />
          <button type="submit" className=' p-2 bg-blue-500 active:bg-blue-600 text-white rounded'>Sign In</button>
        </form>
        <p className='my-4'>register for your<Link href='/signUp' className='text-blue-500'> account</Link> </p>
        {success && <p className='mt-4 text-green-500'>Successfully Sign In!</p>}

      </div>
    </div>
  );
}