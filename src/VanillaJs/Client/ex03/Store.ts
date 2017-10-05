import Todo from "./Todo";
import * as ko from "knockout";

export default class Store {
    
    private static IdGenerator: number = 1;
    public Todos: KnockoutObservableArray<Todo>;

    constructor(todos: Array<Todo> = []) {
        this.Todos = ko.observableArray(todos);
        this.Todos.subscribe(() => console.log("array changed"));
    }

    AddNewTodo(task: string) : void {
        const id = Store.IdGenerator++;
        const newTodo = new Todo(id, task, (todo) => this.DeleteTodo(todo));
        this.Todos.push(newTodo);
        console.log("todo count is now " + id);        
    }

    DeleteTodo(todo: Todo): void {
        const todoIndex = this.Todos.indexOf(todo);
        if (todoIndex !== null) {
            this.Todos.splice(todoIndex, 1);
        }
    }
}