import Todo from "./Todo";

export enum TodoEventType {
    Added,
    Completed,
    Deleted
}

export interface IHandleTodoEvent {
    (todo: Todo, args: TodoEventType) : void
}

export class TodoEvent {

    private _eventType: TodoEventType; 
    private _subscribers: Array<IHandleTodoEvent> = [];

    constructor(eventType: TodoEventType) {
        this._eventType = eventType;
    }

    Subscribe(handler: IHandleTodoEvent)  {
        this._subscribers.push(handler);
    }

    Fire(todo: Todo): void {
        this._subscribers.forEach(handle => handle(todo, this._eventType));
    }
}