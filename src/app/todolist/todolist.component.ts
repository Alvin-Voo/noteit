import { Component, OnInit, OnDestroy} from '@angular/core';
import { ToDoItem } from './todoitem.model';
import { Store } from '@ngrx/store';
import  'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import * as ToDoListActions from './store/todolist.actions';
import * as fromApp from '../store/app.reducers';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit, OnDestroy {
  toDoItemsState : Observable<fromApp.AppState['toDoList']>;
  toDoSubscription: Subscription;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.toDoItemsState = this.store.select('toDoList');
  }

  itemClicked(event, index: number){
    console.log("clicked "+ index);

    this.toDoSubscription = this.toDoItemsState.take(1)
    .subscribe(
      (itemsState)=>{
        if(itemsState.toDoItems[index].done){
          this.store.dispatch(new ToDoListActions.UpdateItem({index: index, done: false}));
        }else{
          this.store.dispatch(new ToDoListActions.UpdateItem({index: index, done: true}));
        }
      }
    )
  }

  addItem(itemInput){
    console.log(itemInput);
    // if(itemInput)this.listItems.push({item: itemInput, done: false});
    this.store.dispatch(new ToDoListActions.AddItem(new ToDoItem(itemInput, false)));
  }

  deleteItem(itemSelected:number){
    console.log("delete "+ itemSelected);
    // this.listItems.splice(itemSelected,1);
    this.store.dispatch(new ToDoListActions.DeleteItem(itemSelected));
  }

  ngOnDestroy(){
    if(this.toDoSubscription)this.toDoSubscription.unsubscribe();
  }
}
