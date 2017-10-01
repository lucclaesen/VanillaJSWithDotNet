import Todo from "./Todo"

/**
 * A view model for todo's.
 */
export default class TodoViewModel {

    constructor(private todo: Todo) {}

    /**
     * Binds a todo to the DOM
     */
    render() : HTMLSpanElement {
        const span = document.createElement("span") as HTMLSpanElement;
        span.innerText = this.todo.task;
        const deleteButton  = document.createElement("button") as HTMLButtonElement;
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => this.todo.delete());
        span.appendChild(deleteButton);
        if (!this.todo.done) {
            const toDoneButton = document.createElement("button") as HTMLButtonElement;
            toDoneButton.innerText = "Done";
            toDoneButton.addEventListener("click", () => this.todo.setComplete());
            span.appendChild(toDoneButton);
        }
        return span;
    }
}