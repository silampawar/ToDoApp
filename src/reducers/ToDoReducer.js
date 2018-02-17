import _ from 'lodash';

let initialState = { 
  todolist: JSON.parse(localStorage.getItem('todolist')) 
};

export default function (state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case 'ADD_TODO':
      {
        let isAlreadyPresent = false;
        const updatedItems = state.todolist.map(item => {

          if (item.text === action.payload.text) {
            isAlreadyPresent = true;
          }
          return item
        });

        let list = [];
        if (!isAlreadyPresent) {
          list = [...state.todolist, action.payload];
        } else {
          list = state.todolist;
        }

        localStorage.setItem('todolist', JSON.stringify(list));
        return { ...state, todolist: list, error: isAlreadyPresent }
      }
    case 'UPDATE':
      {
        const updatedItems = state.todolist.map(item => {

          if (item.text === action.payload.text) {
            return { ...item, ...action.payload }
          }
          return item
        });

        localStorage.setItem('todolist', JSON.stringify(updatedItems));

        return { ...state, todolist: updatedItems };
      }
    case 'DELETE':
      const itemList = [];
      const deletedItems = state.todolist.map(item => {
        if (item.text !== action.payload.text) {
          itemList.push(item);
          return item
        }
      });
      localStorage.setItem('todolist', JSON.stringify(itemList));

      return { ...state, todolist: itemList };

    case 'FILTER':
      return { ...state, filter: action.payload.filter };


    default:
      return state;

  }

  // return state;

}