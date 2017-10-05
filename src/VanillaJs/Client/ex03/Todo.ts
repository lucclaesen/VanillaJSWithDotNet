import * as ko from "knockout";

/**
 * Represents a task that needs to be done or is done.
 */
export default class Todo {

    /** Observable on the todo status (completed or not).
     * Currently used by the Sections in a computed observable
     * on what their rendering responsability is.
     */
    public Completed : KnockoutObservable<boolean>;

    /** Observable on signals for deletion of a todo.
     * Subscribed on by the store for deleting todos.
     */
    public DeleteSignaled = ko.observable<Todo>(null);
    
    /**
     * Initializes a new instance of a todo
     * @param id The id of the todo.
     * @param task What needs to be done in the todo
     * @param completed The todo's current status.
     */
    constructor(
        private readonly id,
        private readonly task: string,
        completed = false) {
       
        this.Completed = ko.observable(completed);
        this.Completed.subscribe(() => "todo state changed");
    }

    /** Bound to the click event of the Todo's complete button */
    private SetComplete(): void {
        if (!this.Completed()) {
            this.Completed(true);
        }
    }

    /** Bound to the click event of the Todo's delete button. */
    private Delete(): void {
        this.DeleteSignaled(this);
    }
}