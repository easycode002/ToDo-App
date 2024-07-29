import React, { useState } from "react";

// Define interface for ToDo item
interface ToDoProps {
  id: number;
  text: string;
  isCompleted: boolean;
}

// Define interface for ToDoForm
interface ToDoFormProp {
  addOrUpdate: (text: string) => void;
  editToDo: ToDoProps | null;
}

// Define interface for TodoList
interface TodoListProps {
  todoList: ToDoProps[];
  deleteTodo: (id: number) => void;
  editTodo: (todoItem: ToDoProps) => void;
}

// ToDoForm Component
const ToDoForm: React.FC<ToDoFormProp> = ({ addOrUpdate, editToDo }) => {
  const [text, setText] = useState(editToDo ? editToDo.text : "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addOrUpdate(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add/Update ToDo</button>
    </form>
  );
};

// ToDoList Component
const ToDoList: React.FC<TodoListProps> = ({ todoList, deleteTodo, editTodo }) => {
  return (
    <ul>
      {todoList.map((todo) => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          <button onClick={() => editTodo(todo)}>Edit</button>
        </li>
      ))}
    </ul>
  );
};

// Main ToDoPage Component
const ToDoPage: React.FC = () => {
  const [todos, setTodos] = useState<ToDoProps[]>([]);
  const [editToDo, setEditToDo] = useState<ToDoProps | null>(null);

  const handleAddOrUpdate = (text: string) => {
    if (editToDo) {
      setTodos(todos.map(todo =>
        todo.id === editToDo.id ? { ...todo, text } : todo
      ));
      setEditToDo(null);
    } else {
      const newToDo: ToDoProps = {
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        text,
        isCompleted: false,
      };
      setTodos([...todos, newToDo]);
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (todo: ToDoProps) => {
    setEditToDo(todo);
  };

  return (
    <React.Fragment>
      <ToDoForm addOrUpdate={handleAddOrUpdate} editToDo={editToDo} />
      <ToDoList todoList={todos} deleteTodo={handleDeleteTodo} editTodo={handleEditTodo} />
    </React.Fragment>
  );
};

export default ToDoPage;
