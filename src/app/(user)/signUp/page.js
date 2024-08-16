// pages/register.js
"use client"
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
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
    const {data, error} = await supabase.auth.signUp(
      {
        email: formData.email,
        password: formData.password,
        options: {
          data: { 
            username: formData.username, 
            role: 0
          }
        }
      }
    );
    if (error) {
      alert("error:"+error.message);
    } else {
      setSuccess(true);
      alert('注册成功!即将跳转到登录页面');
      setTimeout(() => {
        router.push('/signIn');
      }, 3000);
  };}

  return (
    <div className='flex flex-col justify-center items-center min-h-screen border-black border-4'>
      <div className='w-1/4 text-center shadow-xl border-black border-2 rounded-md'>
        <h1 className='mb-4 text-xl text-center'>Register your account here!</h1>
        <form className='flex flex-col divide-y-4 > * + *' onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className=' p-2 border rounded'
            required
          />
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
          <button type="submit" className=' p-2 bg-blue-500 active:bg-blue-600 text-white rounded'>Register</button>
        </form>
        <p className='my-4'>Already have an account? <Link href='/signIn' className='text-blue-500'>Sign in</Link></p>

        {success && <p className='mt-4 text-green-500'>Successfully Sign Up!</p>}

      </div>
    </div>
  );
}