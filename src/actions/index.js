export function addItem(toDoText){
    return function (dispatch) {
        dispatch({ type: 'ADD_TODO',payload:{text:toDoText,currentState: 'I',addedOn: new Date()}});
        //localStorage.addItem('currentToDos','hi');
    }
}

export function updateItem(toDoText,updatedState){
    return function (dispatch) {
        dispatch({ type: 'UPDATE',payload:{text:toDoText,currentState: updatedState}});
        //localStorage.addItem('currentToDos','hi');
    }
}

export function deleteItem(toDoText){
    return function (dispatch) {
        dispatch({ type: 'DELETE',payload:{text:toDoText}});
        //localStorage.addItem('currentToDos','hi');
    }
}

export function updateFilter(filter){
    return function (dispatch) {
        dispatch({ type: 'FILTER',payload:{filter:filter}});
        //localStorage.addItem('currentToDos','hi');
    }
}