import * as ko from "knockout";

export default class Todo {

    public Completed : KnockoutObservable<boolean>;
    private RequestDeletion: (Todo) => void;

    constructor(
        public readonly id,
        public readonly task: string,
        requestDeletion: (Todo) => void, 
        completed = false) {
       
        this.Completed = ko.observable(completed);
        this.Completed.subscribe(() => "todo state changed");
        this.RequestDeletion = requestDeletion;
    }

    public SetComplete(): void {
        if (!this.Completed()) {
            this.Completed(true);
        }
    }

    public Delete(): void {
        this.RequestDeletion(this);
    }
}