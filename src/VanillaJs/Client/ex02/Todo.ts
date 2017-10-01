import { IHandleTodoEvent, TodoEventType } from "./TodoEvent";

/**
 * Represents a todo task.
 */
export default class Todo {
    
    private id: number;
    private todoEventHandler: IHandleTodoEvent;
    
    /**
     * Initializes a new todo instance
     * @param task The task than needs to be done
     * @param done The state of the task: either done or not
     */
    constructor(
        id: number, 
        todoEventHandler : IHandleTodoEvent,
        public task: string, 
        public done: boolean = false) 
    {
        this.id = id;
        this.todoEventHandler = todoEventHandler;
    }

    get Id() {
        return this.id;
    }

    render() : HTMLSpanElement {
        const span = document.createElement("span") as HTMLSpanElement;
        span.innerText = this.task;
        const deleteButton  = document.createElement("button") as HTMLButtonElement;
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => this.todoEventHandler(this, TodoEventType.Deleted));
        span.appendChild(deleteButton);
        if (!this.done) {
            const toDoneButton = document.createElement("button") as HTMLButtonElement;
            toDoneButton.innerText = "Done";
            toDoneButton.addEventListener("click", () => {
                this.done = true;
                this.todoEventHandler(this, TodoEventType.Completed);
            });
            span.appendChild(toDoneButton);
        }
        return span;
    }
}
