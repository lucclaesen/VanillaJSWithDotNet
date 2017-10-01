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

    /**
     * Handles events from the store
     * @param todo 
     * @param eventType 
     */
    public OnTodoEvent(todo: Todo, eventType: TodoEventType): void {
        if (this.ShouldAdd(todo, eventType)) {
            this.renderTodo(todo);
        }

        if (this.ShouldDelete(todo, eventType)) {
            this.unRender(todo);
        }
    }

    private ShouldAdd(todo: Todo, eventType: TodoEventType) : boolean {
        return eventType !== TodoEventType.Deleted && this.completed === todo.done;
    }

    private ShouldDelete(todo: Todo, eventType: TodoEventType) : boolean {
        let res = eventType === TodoEventType.Deleted && this.completed === todo.done;
        res = res || eventType === TodoEventType.Completed && !this.completed;
        return res;
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