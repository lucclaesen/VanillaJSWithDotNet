import * as $ from "jquery";
import Store from "./ex03/Store";
import ApplicationViewModel from "./ex03/ApplicationViewModel";
import * as ko from "knockout";
import Todo from "./ex03/Todo";

$(() => {
    const store = new Store();
    const applicationViewModel = new ApplicationViewModel(store);

    // Bind the createTodoForm's submit event to the store's AddNewTodo method
    const createForm = $("#createForm");
    createForm.submit(() => {
        const createTodoInput = $("#createForm input")[0] as HTMLInputElement;
        let taskContents =  createTodoInput.value;
        store.AddNewTodo(taskContents);
        createTodoInput.value = "";
        return false;
    });

    ko.applyBindings(applicationViewModel, document.getElementById("my-app"));
});

if (module.hot) {
    module.hot.accept();
}