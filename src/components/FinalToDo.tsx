import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Cookies from "js-cookie";

// interface ToDo app
interface ToDoProps {
  id: number;
  task: string;
  dateTime: string;
  status: boolean;
  expiresAt: string;
}

// sample json data
const initialTodos: ToDoProps[] = [
  // {
  //   id: 1,
  //   task: "ស្រលាញ់គេតែម្នាក់ឯង",
  //   dateTime: "2021-01-30T10:00:00Z",
  //   status: false,
  //   expiresAt:"021-01-30T10:00:00Z",
  // },
];

// can define it in util/helper.tsx
const formatDate = (dateTime: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateTime).toLocaleDateString("en-US", options);
};

// Define the formatTime function
const formatTime = (dateTime: string) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateTime).toLocaleTimeString("en-US", options);
};

const FinalToDo: React.FC = () => {
  // create new state for manage data in todo task
  const [todos, setTodos] = useState<ToDoProps[]>(initialTodos);
  const [newTask, setNewTask] = useState<string>("");
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  /*
  // === version store in LocalStorage ===
  // Load todos from localStorage when the component mounts
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      setTodos(initialTodos);
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  */

  // === version store in Cookie ===
  useEffect(() => {
    const storedTodos = Cookies.get("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      setTodos(initialTodos);
    }
  }, []);

  useEffect(() => {
    const expiresCookies = new Date(new Date().getTime() + 1 * 60 * 1000);
    Cookies.set("todos", JSON.stringify(todos), { expires: expiresCookies }); // cookie expire 7 day
  }, [todos]);

  // handle check periodic check update task status base on expiration time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toISOString();
      const updatedTodos = todos.map((todo) =>
        new Date(todo.expiresAt) <= new Date(now)
          ? { ...todo, status: false }
          : todo
      );
      setTodos(updatedTodos);
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [todos]);

  // handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewTask(value);
  };

  // add new task to todo app
  // const addTask = () => {
  //   if (newTask.trim() === "") return;
  //   const newToDo: ToDoProps = {
  //     id: todos.length + 1,
  //     task: newTask,
  //     dateTime: new Date().toISOString(),
  //     status: true,
  //   };
  //   // destructuring and add new task to todo app
  //   setTodos([...todos, newToDo]);
  //   setNewTask(""); // reset input form
  //   return todos;
  //   // Server Less (Severless Stack)
  //   // from scatch
  // };

  // add new task to todo app or update existing task
  const addOrUpdateTask = () => {
    if (newTask.trim() === "") return;

    if (editTaskId === null) {
      // Add new task
      const newToDo: ToDoProps = {
        id: todos.length + 1,
        task: newTask,
        dateTime: new Date().toISOString(),
        status: true,
        expiresAt: new Date(
          new Date().getTime() + 10 * 60 * 1000
        ).toISOString(),
      };
      setTodos([...todos, newToDo]);
    } else {
      // Update existing task
      const updatedTodos = todos.map((todo) =>
        todo.id === editTaskId
          ? { ...todo, task: newTask, dateTime: new Date().toISOString() }
          : todo
      );
      setTodos(updatedTodos);
      setEditTaskId(null);
    }
    setNewTask(""); // reset input form
  };

  // handle toggle task status
  const handleTaskStatus = (id: number) => {
    const updateTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, status: !todo.status } : todo
    );
    setTodos(updateTodos);
  };
  console.log(todos);

  // handle edit task Todo app
  const handleEditTask = (id: number) => {
    const taskToEdit = todos.find((todo) => todo.id === id);
    if (taskToEdit && taskToEdit.status) {
      setNewTask(taskToEdit.task);
      setEditTaskId(id);
    }
  };

  // handle delete todo task
  const handleDeleteTask = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // handle count todo
  const getCounts = () => {
    const completed = todos.filter((todo) => todo.status).length;
    const notCompleted = todos.length - completed;
    return { completed, notCompleted };
  };
  const { completed, notCompleted } = getCounts();
  return (
    <div className="flex flex-col bg-slate-300 h-auto max-w-[600px] min-w-[600px] p-4 gap-2 rounded-lg">
      <h1 className="font-bold text-4xl text-red-600">TODO LIST</h1>
      {/* controll */}
      <div className="flex flex-row justify-between items-center">
        {/* Button */}
        <div className="rounded-xl border-[1px] border-green-500">
          <input
            placeholder="Create task..."
            className="outline-none p-3 rounded-xl rounded-e-none"
            value={newTask}
            onChange={handleInputChange}
          />
          <button
            onClick={addOrUpdateTask}
            className="bg-green-500 px-6 py-3 rounded-s-none rounded-e-xl font-bold text-black hover:bg-green-600 duration-200 ease-in-out hover:text-neutral-50"
            disabled={newTask.trim() == ""}
          >
            {editTaskId === null ? "Add Task" : "Update Task"}
          </button>
        </div>
        {/* combobox */}
        <div className="flex w-20 h-20 bg-neutral-400 rounded-full justify-center items-center">
          <h1 className="font-bold text-2xl text-red-500">{notCompleted}</h1>/
          <h1 className="font-bold text-2xl text-blue-500">{completed}</h1>
        </div>
      </div>
      {/* OR = IR + OT : OR =  16px + 16px*/}
      {/* todo list */}
      <div className="bg-neutral-400 rounded-[20px]">
        {todos.length === 0 ? (
          <div className="p-4 text-center font-bold text-xl text-gray-50">
            No task available, Please add a task.
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex justify-between bg-green-600 p-4 items-center rounded-2xl m-4"
            >
              {/* check button */}
              <div className="flex flex-row justify-center items-center gap-3">
                <input
                  type="checkbox"
                  className="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  onChange={() => handleTaskStatus(todo.id)}
                  checked={todo.status === false}
                />
                {/* content task */}
                <div className="flex flex-col justify-start">
                  {/* text task */}
                  <div>
                    <h1
                      className={`font-bold text-xl ${
                        todo.status === false
                          ? "line-through text-gray-200"
                          : ""
                      }`}
                    >
                      {todo.task}
                    </h1>
                  </div>
                  {/* date of task */}
                  <div className="flex gap-3 justify-center items-center">
                    <h1>{formatDate(todo.dateTime)}</h1>/
                    <h1 className="text-[0px] text-red-300 flex border-2 bg-neutral-500 p-1 rounded-full">
                      {formatTime(todo.expiresAt)}
                    </h1>
                  </div>
                </div>
              </div>
              {/* controll button */}
              <div className="flex">
                {/* edit button */}
                <FaUserEdit
                  onClick={() => handleEditTask(todo.id)}
                  className={`bg-neutral-400 hover:bg-neutral-500 text-gray-50 hover:duration-150 ease-in-out cursor-pointer w-9 h-9 p-1 m-1 rounded ${
                    todo.status === false ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                />
                {/* delete button */}
                <MdDelete
                  onClick={() => handleDeleteTask(todo.id)}
                  className="bg-neutral-400 hover:bg-neutral-500 text-gray-50 hover:duration-150 ease-in-out cursor-pointer w-9 h-9 p-1 m-1 rounded"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FinalToDo;
