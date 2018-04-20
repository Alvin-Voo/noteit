import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID} from '@angular/core';
import { ToDoItem } from './todoitem.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/operator/take';
import  'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/takeWhile';
import * as ToDoListActions from './store/todolist.actions';
import * as fromApp from '../store/app.reducers';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';
import { ClearAllDialogComponent } from './clear-all-dialog/clear-all-dialog.component';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
  animations:[
    trigger('fadein_anim',[
      state('in',style({
        opacity: 1,
      })),
      transition('void => *', [
        style({
          opacity: 0,
        }),
        animate(400)
      ])
    ]),
    // trigger('todolist_anim',[//this animation cannot proceed, coz internally when the todoitemsState is changed (done being changed)
    //   //that particular item will be removed and added back again asynchronously
    //   state('in', style({
    //     opacity: 1,
    //     transform: 'translateX(0)'
    //   })),
    //   transition('void => *', [
    //     style({
    //       opacity: 0,
    //       transform: 'translateX(-100px)'
    //     }),
    //     animate(300)
    //   ]),
    //   transition('* => void', [
    //     animate(300, style({
    //       opacity: 0,
    //       transform: 'translateX(100px)'
    //     }))
    //   ])
    // ])
  ]//end animation
})
export class TodolistComponent implements OnInit, OnDestroy {
  toDoItemsState : Observable<fromApp.AppState['toDoList']>;
  authSubscription: Subscription;
  savedStatus = '';
  savedSuccess = false;
  isAuthenticated = false;
  username = '';

  constructor(private store: Store<fromApp.AppState>,
    private matDialog: MatDialog) { }

  ngOnInit() {
    this.toDoItemsState = this.store.select('toDoList');
    this.authSubscription = this.store.select('auth')
    .subscribe((authState)=>{
      this.isAuthenticated=authState.authenticated;
      this.username=authState.username;
    });
  }

  itemClicked(event, index: number){
    console.log("clicked "+ index);
    this.toDoItemsState.take(1)
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

  deleteAll(){
    const dialogRef = this.matDialog.open(ClearAllDialogComponent, {
      height: '200px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result)this.store.dispatch(new ToDoListActions.DeleteAll());
    });
  }

  saveList(){
    this.savedStatus = '';
    this.store.dispatch(new ToDoListActions.SaveList());
    this.toDoItemsState.skip(1).take(1)
    .subscribe(
      (itemsState)=>{
        this.savedSuccess = itemsState.savedSuccessful;
        if(itemsState.savedSuccessful){
          this.savedStatus="Saved successfully";
        }else this.savedStatus = itemsState.save_fail_message;

        setTimeout(()=>{this.savedStatus=''},3000);
      }
    )
  }

  ngOnDestroy(){
    if(this.authSubscription){
      console.log("auth sub unsubscribe");
      this.authSubscription.unsubscribe();
    }
  }
}
