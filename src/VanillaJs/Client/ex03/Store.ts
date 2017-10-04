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
        this.Todos.push(new Todo(id, task));
        console.log("todo count is now " + id);        
    }
}