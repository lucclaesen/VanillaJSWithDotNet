import Todo from "./Todo";
import { IHandleTodoEvent, TodoEventType } from "./TodoEvent";

export default class TodosSection {

    private htmlTodoList: HTMLElement;

    constructor(todoList: JQuery<HTMLElement> | HTMLElement, public completed: boolean) {
        
        this.htmlTodoList = todoList instanceof HTMLElement
            ? todoList
            : todoList[0];

        this.OnTodoEvent = this.OnTodoEvent.bind(this);
    }

    public OnTodoEvent(todo: Todo, eventType: TodoEventType): void {
        if (this.ShouldHandleEvent(todo)) {
           console.log(`The ${this.MyName} has received an event on todo ${todo.Id} of type ${eventType}`);
           this.htmlTodoList.appendChild(todo.renderAsListElement());
        }
    }

    private ShouldHandleEvent(todo: Todo): boolean {
        return this.completed === todo.done;
    }

    private get MyName(): string {
        return this.completed ? 
            "completedTodosSection" : 
            "openTodosSection";
    }
}