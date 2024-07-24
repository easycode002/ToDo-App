export interface ToDo {
  id: number; // unuque id for each todo
  text: string; // text description of the todo
  completed: boolean; // indicate(ចង្អុលបង្ហាញ)ថាtodo completed or not
}

export interface TodoFormProps {
    addOrUpdateTodo: (text: string) => void; // func take string and return void
    editTodo: ToDo | null;
}

export interface TodoListProps {
  todos: ToDo[];
  deleteTodo: (id: number) => void;
  startEditTodo: (todo: ToDo) => void;
}
