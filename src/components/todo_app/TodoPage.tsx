import React, { useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { ToDo } from "../../data/types";
import TodoHeader from "./TodoHeader";

const TodoPage: React.FC = () => {
  const initialTodos:ToDo[] = [
    { id: 1, text: "Wake ups", completed: true },
    { id: 2, text: "Go to sala", completed: true },
  ]
  const [todos, setTodos] = useState<ToDo[]>(initialTodos);

  const addTodo = (text: string) => {
    const newTodo: ToDo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);        // use destructuring like rest
    console.log(newTodo)                  // it will be return array object
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <div className="">
        <TodoHeader />
        <TodoForm addTodo={addTodo} />
        <TodoList todos={todos} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
};

export default TodoPage;
