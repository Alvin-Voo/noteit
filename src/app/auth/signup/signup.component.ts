import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import { Subscription } from 'rxjs/Subscription';
import "rxjs/add/operator/skipWhile";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  @ViewChild('emailInput') email;
  @ViewChild('passwordInput') password;
  hide = true;
  signupError = '';
  private name = '';
  authEffectsError: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authEffectsError = this.store.select('auth')//i dont want to take 1 coz I want this observation to keep continuing
    //even though after first auth failure
    .subscribe(
      authState =>{
        if(authState.signup_fail_message){
          console.log("signup signupError");
          this.signupError = authState.signup_fail_message;
        }
      }
    )

    this.store.select('auth').skipWhile(
      authState=> !authState.authenticated
    ).take(1)//take once coz authenticated event should happen only once
    .subscribe(
      authState =>this.store.dispatch(new AuthActions.CreateUserDB(this.name))
    )
  }

  ngOnDestroy(){
    if(this.authEffectsError) this.authEffectsError.unsubscribe();
  }

  getEmailError(){
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  getPasswordError(){
    return this.password.hasError('required') ? 'You must enter a value' :
        this.password.hasError('minlength') ? 'Minimum password length is 6' :
            '';
  }

  onSubmitForm(myForm: NgForm){
    this.name = myForm.value.name;
    const email = myForm.value.email;
    const password = myForm.value.password;
    this.signupError = '';
    //signup the user
    this.store.dispatch(new AuthActions.TrySignup({email: email, password: password}));
    //if authenticated, i.e token is set, means user is created, create a database record with the name detail

  }

}
