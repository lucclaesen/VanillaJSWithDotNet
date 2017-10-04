import Todo from "./Todo";
import * as ko from "knockout";

export default class TodoViewModel {


    constructor(private todoModel: Todo){
    }

    get Id() {
        return this.todoModel.id;
    }

    public getTask(): string {
        return this.todoModel.task;
    }

    public SetComplete(): void {
        if (!this.todoModel.Completed()) {
            this.todoModel.Completed(true);
        }
    }
}