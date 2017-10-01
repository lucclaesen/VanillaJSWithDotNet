import * as $ from "jquery";
import Todo from "./Todo";
import Store from "./Store";
import { IHandleEvent } from "./Event";
import TodoEventType from "./TodoEventType";
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

        // since the ontodoEvent is passed as an event handler, make sure 'this' has lexical scope.
        this.OnTodoEvent = this.OnTodoEvent.bind(this);

        // subscribe to events emitted by the store
        store.TodoAdded.Subscribe(this.OnTodoEvent);
        store.TodoDeleted.Subscribe(this.OnTodoEvent);
        store.TodoCompleted.Subscribe(this.OnTodoEvent);
    }

    /**
     * Handles events from the store of todos. Depending on the state of the todo's and
     * the event type, a todo is either rendered or unrendered.
     * @param todo 
     * @param eventType 
     */
    OnTodoEvent(todo: Todo, eventType: TodoEventType): void {
        if (this.ShouldAdd(todo, eventType)) {
            this.RenderTodo(todo);
        }

        if (this.ShouldUnRender(todo, eventType)) {
            this.UnRender(todo);
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

    private RenderTodo(todo : Todo) {
        const todoViewModel = new TodoViewModel(todo);
        const li = document.createElement("li") as HTMLLIElement;
        li.setAttribute("id", todo.Id.toString());
        const innerSpan = todoViewModel.Render();
        li.appendChild(innerSpan);
        this.htmlTodoList.append(li);
    }

    private UnRender(todo: Todo): void {
        console.log(`unrendering todo ${todo.Id}`);
        var el = this.htmlTodoList.find(`#${todo.Id.toString()}`);
        el.remove();
    }
}