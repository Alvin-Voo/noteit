import { Action } from "@ngrx/store";
import { ToDoItem } from "../todoitem.model";

export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';

export class AddItem implements Action{
  readonly type = ADD_ITEM;

  constructor(public payload: ToDoItem){}
}

export class DeleteItem implements Action{
  readonly type = DELETE_ITEM;

  constructor(public payload: number){}
}

export class UpdateItem implements Action{
  readonly type = UPDATE_ITEM;

  constructor(public payload: {index: number, done: boolean}){}
}

export type ToDoListActions = AddItem | DeleteItem | UpdateItem;
