// pages/register.js
"use client"
import { useState } from 'react';
import { createClient } from '@/lib/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const router=useRouter();
  const [formData, setFormData] = useState({
    
    email: '',
    password: ''
  });
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
  email: formData.email,
  password: formData.password,
});
    if (error) {
      alert("error:"+error.message);
    } else {
      setIsSubmitting(false);
      setSuccess(true);
      //const { data, error } = await supabase.auth.getSession()
      //console.log(data);
      alert('sign in successfully');
      setTimeout(() => {
        router.push('/');
      }, 3000);
  };}

  return (
    <div className='flex flex-col justify-center items-center min-h-screen '>
      <div className='w-1/4 text-center shadow-xl border-slate-500 border rounded-md bg-slate-200 bg-opacity-50'>
        <h1 className='mb-4 text-xl text-center font-sans text-slate-500 font-bold '>Welcome</h1>
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
          <button disabled={isSubmitting} type="submit" className=' p-2 bg-blue-500 active:bg-blue-600 text-white rounded'>Sign In</button>
        </form>
        <p className='my-4'><Link href='/signUp' className='text-blue-500'>Register For Your Account</Link> </p>
        {success && <p className='mt-4 text-green-500'>Successfully Sign In!</p>}

      </div>
    </div>
  );
}