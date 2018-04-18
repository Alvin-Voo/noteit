import { ActionReducerMap } from '@ngrx/store';
import * as fromToDoList from '../todolist/store/todolist.reducers';
import * as fromAuth from '../auth/store/auth.reducers';


export interface AppState{
  toDoList: fromToDoList.State,
  auth: fromAuth.State

}

export const reducers: ActionReducerMap<AppState> = {
  toDoList: fromToDoList.toDoListReducer,
  auth: fromAuth.authReducer
}
