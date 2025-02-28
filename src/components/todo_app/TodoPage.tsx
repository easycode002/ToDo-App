import React, { useState } from "react";
import TodoForm, { ToDo } from "./TodoForm";
import TodoList from "./TodoList";
import TodoHeader from "./TodoHeader";

const TodoPage: React.FC = () => {
  const initialTodos: ToDo[] = [
    { id: 1, text: "Wake ups", completed: true },
    { id: 2, text: "Go to sala", completed: false },
  ];
  const [todos, setTodos] = useState<ToDo[]>(initialTodos);
  const [editTodo, setEditTodo] = useState<ToDo | null>(null); // literal

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
    <div className="">
      <TodoHeader />
      <TodoForm addOrUpdateTodo={addOrUpdateTodo} editTodo={editTodo} />
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        startEditTodo={startEditTodo}
      />
    </div>
  );
};

export default TodoPage;
