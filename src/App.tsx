import FinalToDo from "./components/FinalToDo";

function App() {
  return (
    <>
      <div className="flex flex-col pt-10 items-center bg-neutral-100 h-auto min-h-screen w-screen">
        <div className="w-1/2 flex justify-center">
          <FinalToDo/>
        </div>
      </div>
    </>
  );
}

export default App;
