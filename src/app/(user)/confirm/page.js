// app/confirm/page.js (或 app/confirm.js)
"use client"
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase'; // 确保路径正确

export default function ConfirmEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    const verifyEmail = async () => {
      const token_hash = searchParams.get('token_hash');
      const email = searchParams.get('email');
      const type = searchParams.get('type');

      if (type === 'signup' && token_hash && email) {
        try {
          // 使用 Supabase 的 API 进行邮箱验证
          const { data, error } = await supabase.auth.verifyOtp({
            email,
            token: token_hash,
            type: 'signup',
          });

          if (error) {
            setStatus('Verification failed. Please try again.');
          } else {
            setStatus('Your email has been successfully verified!');
            // 邮箱验证成功后，您可以选择自动登录用户，或者重定向到其他页面
            setTimeout(() => {
              router.push('/signin');
            }, 3000); // 3 秒后重定向到登录页面
          }
        } catch (error) {
          setStatus('An unexpected error occurred. Please try again.');
        }
      } else {
        setStatus('Invalid verification link.');
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{status}</p>
    </div>
  );
}
