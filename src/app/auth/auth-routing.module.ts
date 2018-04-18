import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const authRoutes: Routes=[
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
]

@NgModule({
  imports:[
    RouterModule.forRoot(authRoutes)
  ],
  exports: [RouterModule]
})

export class AuthRoutingModule{}
