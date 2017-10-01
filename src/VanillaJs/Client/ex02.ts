import * as $ from "jquery";
import Store  from "./ex02/Store";
import Todo from "./ex02/Todo";
import TodosSection from "./ex02/TodosSection";


$(function() {
    try {
        // create an empty store
        const todos = new Store();
    
        // create two view models representing the store ....
        const openTodosSection = new TodosSection($("#openTodos"), todos, false);
        const completedTodosSection = new TodosSection($("#completedTodos"), todos, true);
    
        // Bind the createTodoForm's submit event to the store's AddNewTodo method
        const createForm = $("#createForm");
        createForm.submit(() => {
            const createTodoInput = $("#createForm input")[0] as HTMLInputElement;
            let taskContents =  createTodoInput.value;
            todos.addNewTodo(taskContents);
            createTodoInput.value = "";
            return false;
        });
    } catch(err) {
        console.log(`oeps. The following error occurred: ${(<Error>err).message}.`);
    }

});
