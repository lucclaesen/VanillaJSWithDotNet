import Store from "./Store";
import Todo from "./Todo";
import * as ko from "knockout";
import TodoViewModel from "./TodoViewModel"

export default class TodoSectionViewModel {
    
    public Todos: KnockoutComputed<Array<TodoViewModel>>;

    constructor(
        store: Store, 
        private handlesCompletedTodos: boolean) {

        this.Todos = ko.computed(() => 
            store.Todos()
                .map((todo) => new TodoViewModel(todo))
                .filter((todo) => todo.Completed() === this.handlesCompletedTodos));
    }
}