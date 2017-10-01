
/**
 * The event handler that can subscribe to events.
 */
export interface IHandleEvent<TSubject, TEventType> {
    (todo: TSubject, args: TEventType) : void
}

/**
 * Represents an event that happened to a subject of a certain type.
 */
export class Event<TSubject, TEventType> {

    private static nextKey: number = 0;
    private _eventType: TEventType; 
    private _subscribers: Map<number, IHandleEvent<TSubject, TEventType>> = new Map();

    constructor(eventType: TEventType) {
        this._eventType = eventType;
    }

    /**
     * Subscribes the given handler to future events.
     * @param handler 
     * @return The handle to the subscription (needed for calling Unsubscribe)
     */
    Subscribe(handler: IHandleEvent<TSubject, TEventType>) : number  {
        const key = Event.nextKey++;
        this._subscribers.set(key, handler);
        return key;
    }

    /**
     * Unsubscribe with the handle returned from Subscribe.
     * @param key The handle returned by Subscribe.
     */
    Unsubscribe(key: number): void {
        this._subscribers.delete(key);
    }

    /**
     * Fires the event on the given subject. This will notify all subscribers.
     * @param subject The instance this event is about.
     */
    Fire(subject: TSubject): void {
        this._subscribers.forEach(handle => handle(subject, this._eventType));
    }
}