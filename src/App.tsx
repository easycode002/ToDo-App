import TodoPage from "./components/todo_app/TodoPage";

function App() {
  return (
    <>
      <div className="flex flex-col pt-10 items-center bg-neutral-800 h-auto min-h-screen w-screen">
        <div className="w-1/3">
          <TodoPage />
        </div>
      </div>
    </>
  );
}

export default App;
