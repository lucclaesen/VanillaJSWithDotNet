import Todo from "./Todo";
import {TodoEventType, TodoEvent} from "./TodoEvent"

/**
 * Represents a list of todo's.
 */
export default class Store {

    // public, since we want others to access todoAdded.Subscribe
    // ... but imperfect, since we want only the event creator to 
    // be able to call todoAdded.Fire
    public TodoAdded: TodoEvent = new TodoEvent(TodoEventType.Added);
    public TodoDeleted: TodoEvent = new TodoEvent(TodoEventType.Deleted);
    public TodoCompleted: TodoEvent = new TodoEvent(TodoEventType.Completed);

    constructor(private todos: Array<Todo> = new Array<Todo>()) {
        this.handleEventsFromTodo = this.handleEventsFromTodo.bind(this);
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
        const newTodo = new Todo(id, this.handleEventsFromTodo, task);
        this.todos.push(newTodo);
        this.TodoAdded.Fire(newTodo);
    }

    handleEventsFromTodo(todo: Todo, eventType: TodoEventType) {
        switch(eventType) {
            case TodoEventType.Deleted:
                this.deleteTodo(todo);
                break;
            case TodoEventType.Completed:
                this.TodoCompleted.Fire(todo);
                break;
            default:
                throw new Error("Unknown event type.");
        }
    }

    deleteTodo(todo: Todo): void {
        const todoIndex = this.todos.findIndex(todo => todo.Id === todo.Id);
        this.todos.splice(todoIndex, 1);
        this.TodoDeleted.Fire(todo);
    }

    private getNextAvailableId() : number {
        const [begin, ...rest] = this.todos.sort((first, second) => second.Id - first.Id);
        if (begin === undefined) {
            return 1;
        }
        return begin.Id + 1;
    }
}