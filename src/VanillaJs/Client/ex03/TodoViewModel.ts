import Todo from "./Todo";
import * as ko from "knockout";

export default class TodoViewModel {

    public Completed: KnockoutObservable<boolean>;

    constructor(private todoModel: Todo){
        this.Completed = ko.observable(todoModel.completed);
    }

    get Id() {
        return this.todoModel.id;
    }

    public getTask(): string {
        return this.todoModel.task;
    }

    public SetCompleted(): void {
        if (!this.Completed()) {
            this.Completed(true);
        }
    }
}