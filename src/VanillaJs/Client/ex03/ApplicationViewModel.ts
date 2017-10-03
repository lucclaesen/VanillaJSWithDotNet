import Store from "./Store";
import TodoSectionViewModel from "./TodoSectionViewModel";

export default class ApplicationViewModel {
    
    private OpenTodosSectionViewModel: TodoSectionViewModel;
    private CompletedTodoSectionViewModel: TodoSectionViewModel;

    constructor(private store: Store) {
        this.OpenTodosSectionViewModel = new TodoSectionViewModel(store, false);
        this.CompletedTodoSectionViewModel = new TodoSectionViewModel(store, true);
    }
}