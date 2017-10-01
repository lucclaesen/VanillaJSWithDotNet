export interface IHandleEvent<TSubject, TEventType> {
    (todo: TSubject, args: TEventType) : void
}

/**
 * Represents an event that happened to a subject of a certain type.
 */
export class Event<TSubject, TEventType> {

    private _eventType: TEventType; 
    private _subscribers: Array<IHandleEvent<TSubject, TEventType>> = [];

    constructor(eventType: TEventType) {
        this._eventType = eventType;
    }

    /**
     * Subscribes the given handler to future events.
     * @param handler 
     */
    Subscribe(handler: IHandleEvent<TSubject, TEventType>) : void  {
        this._subscribers.push(handler);
    }

    /**
     * Fires the event on the given subject. This will notify all subscribers.
     * @param subject
     */
    Fire(subject: TSubject): void {
        this._subscribers.forEach(handle => handle(subject, this._eventType));
    }
}