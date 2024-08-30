import React from 'react';
import AuthButton from './AuthButton';

const MainContent = () => {
  return (
    <div className="p-3 space-y-4 " >
      <div  className="flex justify-between items-start shadow-md rounded-lg p-4 bg-slate-200 bg-opacity-50">
        <div className="flex-1 mr-4">
          <h1 className="text-xl font-extrabold text-rose-400 mb-2 font-mono">Best Resources for Manga and Novel Readers</h1>
          <div className="text-gray-600 text-sm mb-2 font-mono">
          MangaReader is a platform that collects various interesting short comics and novels, offering a range of comic readers and related tools, including but not limited to image generators, AI characters, and tools for converting between voice, text, images, and videos. You can also freely share your own comic strips and favorite tools on the site.
          </div>
          <div className="flex flex-wrap gap-2">
            {['Freemium Tools', 'Free Tools', 'Premium Tools', 'Trial Tools', 'Applications', 'Browser extensions'].map((tag, index) => (
              <span key={index} className="bg-gray-400 text-gray-700 px-2 py-1 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div>
        {<AuthButton/ >}
          {/* <div className="relative">
            <input
              type="text"
              placeholder="Search AI Tools..."
              className="w-full pl-3 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div> */}
          
        </div>
      </div>
      {/* 这里可以添加其他内容 */}
      
    </div>
  );
};

export default MainContent;