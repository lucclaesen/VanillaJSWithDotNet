import Todo from "./Todo";
import { Event } from "./Event"
import TodoEventType from "./TodoEventType";

/**
 * Represents a store (list) of todo's. On the one hand, the store allows to add and delete
 * todo's. On the other hand, it offers an api towards view models interested in rendering
 * a list of todo's.
 */
export default class Store {

    public TodoAdded: Event<Todo, TodoEventType> = new Event(TodoEventType.Added);
    public TodoDeleted: Event<Todo, TodoEventType> = new Event(TodoEventType.Deleted);
    public TodoCompleted: Event<Todo, TodoEventType> = new Event(TodoEventType.Completed);

    constructor(private todos: Array<Todo> = new Array<Todo>()) {
        this.handleEventsFromTodo = this.handleEventsFromTodo.bind(this);
    }

    get Todos() : Array<Todo> {
        return this.todos;
    }

    /**
     * Creates a new todo and adds it to the store. This method is called by the
     * handler attached to the create form.
     * @param task 
     */
    addNewTodo(task: string) {
        const id = this.getNextAvailableId();
        const newTodo = new Todo(id, this.handleEventsFromTodo, task);
        this.todos.push(newTodo);
        this.TodoAdded.Fire(newTodo);
    }

    /**
     * Listens to events fired by individual todo's. If a todo requests deletion, the 
     * todo is first removed from the store and the TodoDeleted event is fired. If a todo signals
     * a change in its inner state, this event is simply published to subscribing view models.
     * @param todo 
     * @param eventType 
     */
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

    private deleteTodo(todo: Todo): void {
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