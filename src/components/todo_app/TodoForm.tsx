import React, { useState, useEffect } from "react";
import { ToDo } from "../../data/types";
import { FaEdit, FaPlus } from "react-icons/fa";

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
      <div className="flex justify-between gap-x-2">
        <input
          type="text"
          className="outline-none p-2 rounded-md bg-[#1F2937] text-gray-100 w-auto"
          value={input}
          placeholder="Write your next task here"
          onChange={(e) => setInput(e.target.value)}
        />

        <button type="submit">
          {editTodo ? (
            <FaEdit className="text-gray-950 h-10 w-10 p-3 bg-[#88AB33] rounded-full" />
          ) : (
            <FaPlus className="text-gray-950 h-10 w-10 p-3 bg-[#88AB33] rounded-full" />
          )}
        </button>
      </div>
    </form>
  );
};
export default TodoForm;
