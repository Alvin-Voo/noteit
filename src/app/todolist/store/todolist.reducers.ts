import { ToDoItem } from "../todoitem.model";
import * as ToDoListActions from './todolist.actions';

export interface State{
  toDoItems: ToDoItem[];
  savedSuccessful: boolean;
  save_fail_message: string;
  fetchedSuccessful: boolean;
  fetch_fail_message: string;
}

const initialState: State ={
  'toDoItems':[
    new ToDoItem('brush teeth', false),
    new ToDoItem('wash feet', true),
    new ToDoItem('take bath', false)
  ],
  savedSuccessful: false,
  save_fail_message: null,
  fetchedSuccessful: false,
  fetch_fail_message: null,
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
    case(ToDoListActions.DELETE_ALL):
      const nilList = [...state.toDoItems];
      nilList.splice(0,nilList.length);
      return{
        ...state,
        toDoItems: nilList
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
    case(ToDoListActions.SET_ITEMS):
      return{
        ...state,
        toDoItems: [...action.payload]
      };
    case(ToDoListActions.SAVE_SUCCESS):
      return{
        ...state,
        savedSuccessful: action.payload.savedSuccessful,
        save_fail_message: action.payload.save_fail_message
      }
    case(ToDoListActions.FETCH_SUCCESS):
      return{
        ...state,
        fetchedSuccessful: action.payload.fetchedSuccessful,
        fetch_fail_message: action.payload.fetch_fail_message
      }
    default:
      return state;
  }
}
