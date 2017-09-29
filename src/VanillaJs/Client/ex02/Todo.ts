/**
 * Represents a todo task.
 */
export default class Todo {
    
    private id: number;
    
    /**
     * Initializes a new todo instance
     * @param task The task than needs to be done
     * @param done The state of the task: either done or not
     */
    constructor(id: number, public task: string, public done: boolean = false) 
    {
        this.id = id;
    }

    get Id() {
        return this.id;
    }

    renderAsListElement() {
        let li = document.createElement("li") as HTMLLIElement;
        li.textContent = this.task;
        return li;
    }
}
