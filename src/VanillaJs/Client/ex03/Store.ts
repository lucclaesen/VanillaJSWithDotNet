import Todo from "./Todo";
import * as ko from "knockout";

/**
 * Represents a managed set of Todos. 
 */
export default class Store {

    /** The observable array of todo's. Bound to the sectionVM's computation of
     * what they need to render.
     */
    public Todos: KnockoutObservableArray<Todo>;

    private static IdGenerator: number = 1;
    
    /**
     * Initializes a new instance of the Store.
     * @param todos The initial set of todo' to initialize this store with (defaults to an empty
     * set of no initial value is explicitly given).
     */
    constructor(todos: Array<Todo> = []) {
        this.Todos = ko.observableArray(todos);
        this.Todos.subscribe(() => console.log("array changed"));
    }

    /**
     * Adds a new todo with the given task. Bound to the submittal of the
     * create form for todos.
     * @param task What needs to bedone.
     */
    AddNewTodo(task: string) : void {
        const id = Store.IdGenerator++;
        const newTodo = new Todo(id, task);
        newTodo.DeleteSignaled.subscribe((todo) => this.DeleteTodo(todo));
        this.Todos.push(newTodo);
        console.log("todo count is now " + id);        
    }

    /**
     * Deletes the given todo from the store.
     * @param todo The todo to delete.
     */
    DeleteTodo(todo: Todo): void {
        const todoIndex = this.Todos.indexOf(todo);
        if (todoIndex !== null) {
            this.Todos.splice(todoIndex, 1);
        }
    }
}