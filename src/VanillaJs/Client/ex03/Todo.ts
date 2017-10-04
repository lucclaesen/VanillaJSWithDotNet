import * as ko from "knockout";

export default class Todo {

    public Completed : KnockoutObservable<boolean>;

    constructor(
        public readonly id,
        public readonly task: string, 
        completed = false) {
       
        this.Completed = ko.observable(completed);
        this.Completed.subscribe(() => "todo state changed");
        
    }

    public SetComplete(): void {
        if (!this.Completed()) {
            this.Completed(true);
        }
    }
}