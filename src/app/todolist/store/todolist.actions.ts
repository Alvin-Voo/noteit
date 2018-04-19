import { Action } from "@ngrx/store";
import { ToDoItem } from "../todoitem.model";

export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_ALL = "DELETE_ALL";
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const SET_ITEMS = 'SET_ITEMS';
export const SAVE_LIST = 'SAVE_LIST';
export const SAVE_SUCCESS = 'SAVE_SUCCESS';
export const FETCH_LIST = 'FETCH_LIST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';

export class AddItem implements Action{
  readonly type = ADD_ITEM;

  constructor(public payload: ToDoItem){}
}

export class DeleteItem implements Action{
  readonly type = DELETE_ITEM;

  constructor(public payload: number){}
}

export class DeleteAll implements Action{
  readonly type = DELETE_ALL;

}

export class UpdateItem implements Action{
  readonly type = UPDATE_ITEM;

  constructor(public payload: {index: number, done: boolean}){}
}

export class SetItems implements Action{
  readonly type = SET_ITEMS;

  constructor(public payload: ToDoItem[]){}
}


export class SaveList implements Action{
  readonly type = SAVE_LIST;

}

export class FetchList implements Action{
  readonly type = FETCH_LIST;
}

export class SaveSuccess implements Action{
  readonly type = SAVE_SUCCESS;

  constructor(public payload: {savedSuccessful: boolean, save_fail_message: string}){}
}

export class FetchSuccess implements Action{
  readonly type = FETCH_SUCCESS;

  constructor(public payload: {fetchedSuccessful: boolean, fetch_fail_message: string}){}
}

export type ToDoListActions = AddItem | DeleteItem | UpdateItem | DeleteAll | SetItems |  SaveList | SaveSuccess | FetchList | FetchSuccess;
