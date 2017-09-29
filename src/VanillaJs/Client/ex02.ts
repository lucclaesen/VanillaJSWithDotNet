import * as $ from "jquery";
import Store  from "./ex02/Store";
import Todo from "./ex02/Todo";
import TodosSection from "./ex02/TodosSection";


$(function() {
    // create an empty store
    const todos = new Store();

    // create todosections and subscribe them to do store.TodoAdded event
    const openTodosSection = new TodosSection($("#openTodos"), false);
    const completedTodosSection = new TodosSection($("#completedTodos"), true);
    todos.TodoAdded.Subscribe(openTodosSection.OnTodoEvent);
    todos.TodoAdded.Subscribe(completedTodosSection.OnTodoEvent);

    // handle the createTodoForm's submit event
    const createForm = $("#createForm");
    createForm.submit(() => {
        const createTodoInput = $("#createForm input")[0] as HTMLInputElement;
        let taskContents =  createTodoInput.value;
        todos.addNewTodo(taskContents);
        createTodoInput.value = "";
        return false;
    });
});
