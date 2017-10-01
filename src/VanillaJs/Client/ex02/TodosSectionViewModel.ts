import * as $ from "jquery";
import Todo from "./Todo";
import Store from "./Store";
import { IHandleTodoEvent, TodoEventType } from "./TodoEvent";
import TodoViewModel from "./TodoViewModel";

/**
 * A view model class representing a section of todo's given their state (completed or not).
 */
export default class TodosSectionViewModel {

    private htmlTodoList: JQuery<HTMLElement>;

    /**
     * Initializes a new instance of a TodosSection
     * @param todoList The html element to which this instance is 'bound'
     * @param store The store of todo's represented by this viewModel. The current instance
     * will subscribe to the events emitted by the store (on todo added, completed or deleted).
     * @param completed Whether or not this section renders completed todo's.
     */
    constructor(
        todoList: JQuery<HTMLElement> | HTMLElement, 
        store: Store,
        public completed: boolean) {
        
        this.htmlTodoList = todoList instanceof HTMLElement
            ? $(todoList)
            : todoList;

        this.OnTodoEvent = this.OnTodoEvent.bind(this);

        store.TodoAdded.Subscribe(this.OnTodoEvent);
        store.TodoDeleted.Subscribe(this.OnTodoEvent);
        store.TodoCompleted.Subscribe(this.OnTodoEvent);
    }

    /**
     * Handles events from the store of todos. Depending on the state of the todo's and
     * the event types, a todo is either rendered or unrendered.
     * @param todo 
     * @param eventType 
     */
    public OnTodoEvent(todo: Todo, eventType: TodoEventType): void {
        if (this.ShouldAdd(todo, eventType)) {
            this.renderTodo(todo);
        }

        if (this.ShouldUnRender(todo, eventType)) {
            this.unRender(todo);
        }
    }

    private ShouldAdd(todo: Todo, eventType: TodoEventType) : boolean {
        return eventType !== TodoEventType.Deleted && this.completed === todo.done;
    }

    private ShouldUnRender(todo: Todo, eventType: TodoEventType) : boolean {
        let res = eventType === TodoEventType.Deleted && this.completed === todo.done;
        res = res || eventType === TodoEventType.Completed && !this.completed;
        return res;
    }

    private renderTodo(todo : Todo) {
        const todoViewModel = new TodoViewModel(todo);
        const li = document.createElement("li") as HTMLLIElement;
        li.setAttribute("id", todo.Id.toString());
        const innerSpan = todoViewModel.render();
        li.appendChild(innerSpan);
        this.htmlTodoList.append(li);
    }

    private unRender(todo: Todo): void {
        console.log(`unrendering todo ${todo.Id}`);
        var el = this.htmlTodoList.find(`#${todo.Id.toString()}`);
        el.remove();
    }
}