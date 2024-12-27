'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FaGithub, FaWeibo, FaWeixin } from 'react-icons/fa';

export default function Login() {
  const [loginMethod, setLoginMethod] = useState<'phone' | 'account'>('phone');

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="border-l-2 border-b-2 border-t-2 border-cyan-50 border-r-2 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setLoginMethod('phone')}
            className={`px-4 py-2 ${loginMethod === 'phone' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Phone
          </button>
          <button
            onClick={() => setLoginMethod('account')}
            className={`px-4 py-2 ${loginMethod === 'account' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Account
          </button>
        </div>
        {loginMethod === 'phone' ? (
          <div className="space-y-4">
            <input type="text" placeholder="Phone Number" className="w-full px-4 py-2 border rounded" />
            <input type="text" placeholder="Verification Code" className="w-full px-4 py-2 border rounded" />
            <div className="flex items-center space-x-2">
              <input type="text" placeholder="Captcha" className="w-full px-4 py-2 border rounded" />
              <img src="/path/to/captcha" alt="Captcha" className="h-10" />
            </div>
            <button className="w-full py-2 bg-blue-500 text-white rounded">Sign In</button>
          </div>
        ) : (
          <div className="space-y-4">
            <input type="text" placeholder="Username" className="w-full px-4 py-2 border rounded" />
            <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded" />
            <div className="flex items-center space-x-2">
              <input type="text" placeholder="Captcha" className="w-full px-4 py-2 border rounded" />
              <img src="/path/to/captcha" alt="Captcha" className="h-10" />
            </div>
            <button className="w-full py-2 bg-blue-500 text-white rounded">Sign In</button>
          </div>
        )}
        <p className="text-center mt-6 mb-4">Or sign in with:</p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => signIn('github')}
            className="flex items-center justify-center w-full py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            <FaGithub className="mr-2" /> Sign in with GitHub
          </button>
          <button
            onClick={() => signIn('weibo')}
            className="flex items-center justify-center w-full py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            <FaWeibo className="mr-2" /> Sign in with Weibo
          </button>
          <button
            onClick={() => signIn('wechat')}
            className="flex items-center justify-center w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            <FaWeixin className="mr-2" /> Sign in with WeChat
          </button>
        </div>
      </div>
    </div>
  );
} 