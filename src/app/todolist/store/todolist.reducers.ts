import { ToDoItem } from "../todoitem.model";
import * as ToDoListActions from './todolist.actions';

export interface State{
  toDoItems: ToDoItem[];
}

const initialState: State ={
  'toDoItems':[
    new ToDoItem('brush teeth', false),
    new ToDoItem('wash feet', true),
    new ToDoItem('take bath', false)
  ]
}

export function toDoListReducer(state=initialState, action : ToDoListActions.ToDoListActions){
  switch(action.type){
    case(ToDoListActions.ADD_ITEM):
      return{
        ...state,
        toDoItems: [...state.toDoItems, action.payload]
      };
    case(ToDoListActions.DELETE_ITEM):
      const oldToDoList = [...state.toDoItems];
      oldToDoList.splice(action.payload,1);
      return{
        ...state,
        toDoItems: oldToDoList
      };
    case(ToDoListActions.UPDATE_ITEM):
      const item = state.toDoItems[action.payload.index];
      const newItem = {item: item.item, done: action.payload.done};
      const updatedItem = {
        ...item,
        ...newItem //must spread for object literal assignment
      };
      const toDoList = [...state.toDoItems];
      toDoList[action.payload.index] = updatedItem;
      return{
        ...state,
        toDoItems: toDoList //for array assignment
      };
    default:
      return state;
  }
}
