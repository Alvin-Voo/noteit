import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  @ViewChild('emailInput') email;
  @ViewChild('passwordInput') password;
  hide = true;
  signinError: string;
  authEffectsError: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authEffectsError = this.store.select('auth')
    .subscribe(
      authState =>{
        if(authState.signin_fail_message) this.signinError = authState.signin_fail_message;
      }
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
    const email = myForm.value.email;
    const password = myForm.value.password;
    console.log(email+"   "+password);
    this.signinError = '';
    //signup the user
    this.store.dispatch(new AuthActions.TrySignin({username: email, password: password}));
    //populate the to do list with data from db
  }

}
