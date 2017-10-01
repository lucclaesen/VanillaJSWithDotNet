import { IHandleEvent } from "./Event";
import TodoEventType from "./TodoEventType";

/**
 * Represents a todo task.
 */
export default class Todo {
    
    private id: number;
    private todoEventHandler: IHandleEvent<Todo, TodoEventType>;
    
    /**
     * Initializes a new todo instance.
     * @param id The id of the task.
     * @param todoEventHandler function to be called on deletion of completion of the todo.
     * @param task The task than needs to be done
     * @param done The state of the task: either done or not
     */
    constructor(
        id: number, 
        todoEventHandler : IHandleEvent<Todo, TodoEventType>,
        public task: string, 
        public done: boolean = false) 
    {
        this.id = id;
        this.todoEventHandler = todoEventHandler;
    }

    get Id() {
        return this.id;
    }

    delete() {
        this.todoEventHandler(this, TodoEventType.Deleted);
    }

    setComplete() {
        this.done = true;
        this.todoEventHandler(this, TodoEventType.Completed);
    }
}
