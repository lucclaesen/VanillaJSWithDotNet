import Store from "./Store";
import TodoSectionViewModel from "./TodoSectionViewModel";

/**
 * The application view model.
 */
export default class ApplicationViewModel {
    
    private OpenTodosSectionViewModel: TodoSectionViewModel;
    private CompletedTodoSectionViewModel: TodoSectionViewModel;

    /**
     * Initializes a new instance of the application's view model.
     * @param store 
     */
    constructor(private store: Store) {
        this.OpenTodosSectionViewModel = new TodoSectionViewModel(store, false);
        this.CompletedTodoSectionViewModel = new TodoSectionViewModel(store, true);
    }
}