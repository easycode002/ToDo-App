// src/components/TodoForm.tsx

import React, { useState } from "react";
import { TodoFormProps } from "../../data/types";
import { FaPlus } from "react-icons/fa";

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {   // define type for event
    event.preventDefault();  
    if (input.trim()) {   // ប្រសិនបើមានinput វានឹងtrim() កាត់space freeចោល
      addTodo(input);     // add `input` to addTodo 
      setInput("");       // after add, setInput to empty string
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between items-center gap-x-4">
        <input
          className="outline-none p-2 bg-[#1F2937] rounded-lg text-gray-50 w-full"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write your next task"
        />
        <div className="flex gap-x-4">
          <button
            type="submit"
            className="flex justify-center items-center bg-[#88AB33] px-2 py-2 rounded-full h-10 w-10"
          ><FaPlus className="text-white" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default TodoForm;
