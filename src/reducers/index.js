import { combineReducers } from 'redux';
import toDoReducer from './ToDoReducer';

const rootReducer = combineReducers({
  todo:toDoReducer
});

export default rootReducer;