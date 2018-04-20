import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TodolistComponent } from './todolist/todolist.component';

const appRoutes: Routes=[
  {path: '', redirectTo: 'todolist', pathMatch: 'full'},
  {path: 'todolist', component: TodolistComponent},
  {path: '**', redirectTo: 'todolist'}
]

@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule{}
