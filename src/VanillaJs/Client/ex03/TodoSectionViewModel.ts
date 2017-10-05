import Store from "./Store";
import Todo from "./Todo";
import * as ko from "knockout";

/**
 * Represents a viewmodel supporting a list view of todo's with
 * the same status.
 */
export default class TodoSectionViewModel {
    
    private Todos: KnockoutComputed<Array<Todo>>;

    constructor(
        store: Store, 
        private handlesCompletedTodos: boolean) {

        this.Todos = ko.computed(() => 
            store.Todos()
            .filter((todo) => todo.Completed() === this.handlesCompletedTodos)           
        );
    }
}