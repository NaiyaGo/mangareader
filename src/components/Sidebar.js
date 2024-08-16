import React from 'react';

import SubmitButton from './submitButton';
const Sidebar = ({categories}) => {
  

  return (
    <div className="mt-1 ml-1 w-64 bg-white-200 shadow-md rounded-lg overflow-hidden flex flex-col h-screen sticky top-0">
      <div className="p-4  shadow-sm text-gray-700 flex space-x-1 justify-between items-center">
        <h2 className=" text-xl font-bold">AIMonstr</h2>
        <SubmitButton />
      </div>
      <div className="overflow-y-auto flex-grow">
        <ul className="divide-y divide-gray-200">
          {categories.map((category, index) => (
            <li key={index} className="flex justify-between items-center p-4 hover:bg-gray-50 cursor-pointer text-xs">
              <span className="text-gray-700">{category.name}</span>
              <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
                {category.count}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;