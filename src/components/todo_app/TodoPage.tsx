import React, { useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { ToDo } from "../../data/types";
import TodoHeader from "./TodoHeader";

const TodoPage: React.FC = () => {
  const initialTodos: ToDo[] = [
    { id: 1, text: "Wake ups", completed: true },
    { id: 2, text: "Go to sala", completed: true },
  ];
  const [todos, setTodos] = useState<ToDo[]>(initialTodos);
  const [editTodo, setEditTodo] = useState<ToDo | null>(null);

  const addOrUpdateTodo = (text: string) => {
    if (editTodo) {
      setTodos(
        todos.map((todo) =>
          todo.id === editTodo.id ? { ...todo, text } : todo
        )
      );
      setEditTodo(null);
    } else {
      const newTodo: ToDo = { id: Date.now(), text, completed: false };
      setTodos([...todos, newTodo]);
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditTodo = (todo: ToDo) => {
    setEditTodo(todo);
  };

  return (
    <div>
      <div className="">
        <TodoHeader />
        <TodoForm addOrUpdateTodo={addOrUpdateTodo} editTodo={editTodo} />
        <TodoList todos={todos} deleteTodo={deleteTodo} startEditTodo={startEditTodo}/>
      </div>
    </div>
  );
};

export default TodoPage;
