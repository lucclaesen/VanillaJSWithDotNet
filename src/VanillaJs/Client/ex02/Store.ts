import Todo from "./Todo";
import {TodoEventType, TodoEvent} from "./TodoEvent"

/**
 * Represents a list of todo's
 */
export default class Store {

    // public, since we want others to access todoAdded.Subscribe
    // ... but imperfect, since we want only the event creator to 
    // be able t call todoAdded.Fire
    public TodoAdded: TodoEvent = new TodoEvent(TodoEventType.Added);

    constructor(
        private todos: Array<Todo> = new Array<Todo>()) {
    }

    get Todos() : Array<Todo> {
        return this.todos;
    }

    /**
     * Creates a new todo and adds it to the store
     * @param task 
     */
    addNewTodo(task: string) {
        const id = this.getNextAvailableId();
        const newTodo = new Todo(id, task);
        this.todos.push(newTodo);
        this.TodoAdded.Fire(newTodo);
    }

    private getNextAvailableId() : number {
        const [begin, ...rest] = this.todos.sort((first, second) => second.Id - first.Id);
        if (begin === undefined) {
            return 1;
        }
        return begin.Id + 1;
    }
}