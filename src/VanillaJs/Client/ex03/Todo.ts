export default class Todo {

    constructor(
        public readonly id,
        public readonly task: string, 
        public completed: boolean = false) {
        
    }
}