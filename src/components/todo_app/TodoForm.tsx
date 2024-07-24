// // src/components/TodoForm.tsx

// import React, { useEffect, useState } from "react";
// import { TodoFormProps } from "../../data/types";
// import { FaPlus } from "react-icons/fa";

// const TodoForm: React.FC<TodoFormProps> = ({ addOrUpdateTodo,editTodo }) => {
//   const [input, setInput] = useState<string>("");
//   useEffect(() => {
//     if (editTodo) {
//       setInput(editTodo.text);
//     } else {
//       setInput("");
//     }
//   }, [editTodo]);
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (input.trim()) {
//       addOrUpdateTodo(input);
//       setInput("");
//     }
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="flex justify-between items-center gap-x-4">
//         <input
//           className="outline-none p-2 bg-[#1F2937] rounded-lg text-gray-50 w-full"
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Write your next task"
//         />
//         <div className="flex gap-x-4">
//           <button
//             type="submit"
//             className="flex justify-center items-center bg-[#88AB33] px-2 py-2 rounded-full h-10 w-10"
//           ><FaPlus className="text-white" />
//           {editTodo ? "Update Todo" : "Add Todo"}
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default TodoForm;
import React, { useState, useEffect } from "react";
import { ToDo } from "../../data/types";

interface TodoFormProps {
  addOrUpdateTodo: (text: string) => void;
  editTodo: ToDo | null;
}

const TodoForm: React.FC<TodoFormProps> = ({ addOrUpdateTodo, editTodo }) => {
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.text);
    } else {
      setInput("");
    }
  }, [editTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addOrUpdateTodo(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">{editTodo ? "Update Todo" : "Add Todo"}</button>
    </form>
  );
};

export default TodoForm;

