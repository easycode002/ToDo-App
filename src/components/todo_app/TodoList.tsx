import React from "react";
import { TodoListProps } from "../../data/types";
import { MdDeleteForever, MdEdit } from "react-icons/md";

const TodoList: React.FC<TodoListProps> = ({ todos, deleteTodo }) => {
  return (
    <div className="mt-2">
      {todos.length === 0 ? (
        <p className="text-gray-500">
          No todo available. Please add some task!
        </p>
      ) : (
        <ul className="flex flex-col gap-y-1 mt-4">
          {todos.map((todo) => (
            <li key={todo.id}>
              <div className="flex justify-between border-[#88AB33] border-[1px] p-1">
                <div className="flex flex-row justify-center items-center gap-x-2">
                  <div className="flex bg-[#22C55E] h-5 w-5 rounded-full" />
                  <span
                    // style={{
                    //   textDecoration: todo.completed ? "line-through" : "none",
                    // }}
                    style={{
                      textDecoration: todo.completed
                        ? "Completed"
                        : "Not Completed",
                    }}
                    className="text-gray-300"
                  >
                    {todo.text}
                  </span>
                </div>
                <div className="flex gap-x-0">
                  <button className="px-1 py-2">
                    <MdEdit className="w-5 h-5 text-[#BFB097]" />
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="px-1 py-2"
                  >
                    <MdDeleteForever className="h-5 w-5 text-[#BFB097]" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
