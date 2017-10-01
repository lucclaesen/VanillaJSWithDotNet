import * as $ from "jquery";
import Todo from "./Todo";
import { IHandleTodoEvent, TodoEventType } from "./TodoEvent";

export default class TodosSection {

    private htmlTodoList: JQuery<HTMLElement>;

    constructor(todoList: JQuery<HTMLElement> | HTMLElement, public completed: boolean) {
        
        this.htmlTodoList = todoList instanceof HTMLElement
            ? $(todoList)
            : todoList;

        this.OnTodoEvent = this.OnTodoEvent.bind(this);
    }

    public OnTodoEvent(todo: Todo, eventType: TodoEventType): void {
        if (this.ShouldHandleEvent(todo)) {
            switch(eventType) {
                case TodoEventType.Added:
                    this.renderTodo(todo);
                    break;
                case TodoEventType.Deleted:
                    this.unRender(todo);
                    break;
            }
        }
    }

    private renderTodo(todo : Todo) {
        const li = document.createElement("li") as HTMLLIElement;
        li.setAttribute("id", todo.Id.toString());
        const innerSpan = todo.render();
        li.appendChild(innerSpan);
        this.htmlTodoList.append(li);
    }

    private unRender(todo: Todo): void {
        console.log(`unrendering todo ${todo.Id}`);
        var el = this.htmlTodoList.find(`#${todo.Id.toString()}`);
        el.remove();
    }

    private ShouldHandleEvent(todo: Todo): boolean {
        return this.completed === todo.done;
    }
}