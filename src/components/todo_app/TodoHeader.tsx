import React from "react";

const TodoHeader: React.FC = () => {
  return (
    <div className="flex rounded border-[1px] border-[#88AB33] mb-4 h-24 justify-center items-center gap-x-7">
      <div>
        <h1 className="text-gray-50 text-2xl">Task Done</h1>
        <h1 className="text-gray-50 text-md">Keep it up</h1>
      </div>
      <div className="flex bg-[#88AB33] w-16 h-16 rounded-full items-center justify-center">
        <h1 className="text-xl">2/3</h1>
      </div>
    </div>
  );
};

export default TodoHeader;
