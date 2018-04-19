import { Injectable } from '@angular/core';
import {Effect, Actions} from '@ngrx/effects'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';
import * as ToDoListActions from './todolist.actions';
import * as fromApp from '../../store/app.reducers';
import { ToDoItem } from '../todoitem.model';


@Injectable()
export class ToDoListEffects {

  @Effect()
  saveList = this.actions$
  .ofType(ToDoListActions.SAVE_LIST)
  .switchMap(
    ()=>this.store.select('toDoList').take(1)
  )
  .switchMap((todolistState)=>{
    const uid = firebase.auth().currentUser.uid;
    console.log("saving uid "+uid);
    return fromPromise(firebase.database().ref('users/'+uid+'/todolist').set(todolistState.toDoItems))
    .catch(error=>{
      console.log("error on saving "+ error.message);
      return Observable.of(error);
    });
  })
  .switchMap((resp)=>{
    console.log("switch 2 ");
    if (resp instanceof Error){
      return Observable.of({type:ToDoListActions.SAVE_SUCCESS, payload: {savedSuccessful: false, save_fail_message: resp.message}})//the last return is going to be handled by effects
    }
    return Observable.of({type:ToDoListActions.SAVE_SUCCESS, payload: {savedSuccessful: true, save_fail_message: null}});
  })

  @Effect()
  fetchList = this.actions$
  .ofType(ToDoListActions.FETCH_LIST)
  .switchMap(
    ()=>{
      const uid = firebase.auth().currentUser.uid;
      const ref = firebase.database().ref('users/'+uid);
      return fromPromise(ref.once("value").then(
        (snapshot:firebase.database.DataSnapshot)=>{
          if(snapshot.hasChild("todolist")){
            console.log("snap shot child "+ snapshot.child("todolist").val());
            return snapshot.child("todolist").val() as ToDoItem[];
          }else return new Array<ToDoItem>();
        }
      )).catch(error=>{
        console.log("error on fetching "+ error.message);
        return Observable.of(error);
      })
      ;}
  )
  .mergeMap((resp)=>{
    if (resp instanceof Error){
      return Observable.of({type:ToDoListActions.FETCH_SUCCESS, payload: {fetchedSuccessful: false, fetch_fail_message: resp.message}})//the last return is going to be handled by effects
    }
    return [
      {type:ToDoListActions.FETCH_SUCCESS, payload: {fetchedSuccessful: true, fetch_fail_message: null}},
      {type:ToDoListActions.SET_ITEMS, payload: resp}
    ]
  })

  constructor(private actions$: Actions, private store: Store<fromApp.AppState>){}
}
