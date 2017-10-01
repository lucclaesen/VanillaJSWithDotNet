import Todo from "./Todo"

/**
 * A view model for todo's.
 */
export default class TodoViewModel {

    constructor(private todo: Todo) {}

    /**
     * Binds a todo to the DOM. This includes generating a representation for the todo (depending
     * on its state) and binding DOM events to todo actions.
     */
    Render() : HTMLSpanElement {
        const span = document.createElement("span") as HTMLSpanElement;
        span.innerText = this.todo.task;
        const deleteButton  = document.createElement("button") as HTMLButtonElement;
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => this.todo.Delete());
        span.appendChild(deleteButton);
        if (!this.todo.done) {
            const toDoneButton = document.createElement("button") as HTMLButtonElement;
            toDoneButton.innerText = "Done";
            toDoneButton.addEventListener("click", () => this.todo.SetComplete());
            span.appendChild(toDoneButton);
        }
        return span;
    }
}