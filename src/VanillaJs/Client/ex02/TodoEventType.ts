 /**
  * What happened to a todo
  */
 enum TodoEventType {
    /** Signals that a todo has been created. */
    Added,
    /** Signals that a todo became completed. */
    Completed,
    /** Signals that a todo was deleted. */
    Deleted
}

export default TodoEventType;