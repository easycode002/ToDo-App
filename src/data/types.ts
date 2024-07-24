export interface ToDo {
  id: number; // unuque id for each todo
  text: string; // text description of the todo
  completed: boolean; // indicate(ចង្អុលបង្ហាញ)ថាtodo completed or not
}

export interface TodoFormProps {
  addTodo: (text: string) => void; // func take string and return void
}

export interface TodoListProps {
  todos: ToDo[]; // define the prop array for ToDo items
  deleteTodo: (id: number) => void; //
}
