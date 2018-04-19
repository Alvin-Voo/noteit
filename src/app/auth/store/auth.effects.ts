import { Injectable } from '@angular/core';
import {Effect, Actions} from '@ngrx/effects'
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import * as AuthActions from './auth.actions';

import { fromPromise } from 'rxjs/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthEffects {

  @Effect({ dispatch: false })
  logActions$ = this.actions$
  .do(action => {
    console.log(action);
  });

  @Effect()
  authSignup = this.actions$
  .ofType(AuthActions.TRY_SIGNUP)//<-- ofType is from Actions class, returning Action ofType ...
  .map((action: AuthActions.TrySignup) =>{
    console.log("auth actions try signup");
    return action.payload;
    //return Observable<payload:{email: string, password: string}>
  })
  .switchMap((authData: {email: string, password: string}) =>{
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password))
      .catch(error=>{
        console.log("error sign up "+ error.message);
        return Observable.of(error);
      })
    }
  ).switchMap((resp)=>{
    if (resp instanceof Error){
      return Observable.of({type:AuthActions.SIGNUP_FAIL, payload: resp.message})//the last return is going to be handled by effects
    }
    return Observable.of({type:AuthActions.SIGNUP});
  })

  @Effect()
  authSignupAfter = this.actions$
  .ofType(AuthActions.SIGNUP)
  .switchMap(()=>{
      return fromPromise(firebase.auth().currentUser.getIdToken())
      .catch(error=>{
        console.log("getIdToken error "+ error.message);
        return Observable.of(error);
      })
    }
  ).switchMap((resp)=>{
    if (resp instanceof Error){
      return Observable.of({type:AuthActions.SIGNUP_FAIL, payload: resp.message})//the last return is going to be handled by effects
    }else{
      this.router.navigate(['/']);
      return Observable.of({type:AuthActions.SET_TOKEN, payload: resp});//resp here is the token
    }
  })

  @Effect({dispatch: false})
  createUserDB = this.actions$
  .ofType(AuthActions.CREATE_USERDB)
  .map((action: AuthActions.CreateUserDB)=>action.payload)
  .do((name)=>{
    const email = firebase.auth().currentUser.email;
    const uid = firebase.auth().currentUser.uid;
    firebase.database().ref('users/'+uid).set({
      username: name,
      email: email,
    });
  })

  @Effect()
  authSignin = this.actions$
  .ofType(AuthActions.TRY_SIGNIN)
  .map((action: AuthActions.TrySignin) =>{
    return action.payload;
  })
  .switchMap((authData: {email: string, password: string}) =>{
    return fromPromise(firebase.auth().
    signInWithEmailAndPassword(authData.email,authData.password))
    .catch(error=>{
      console.log("error sign in "+ error.message);
      return Observable.of(error);
    })
  })
  .switchMap((resp)=>{
    if (resp instanceof Error){
      return Observable.of({type:AuthActions.SIGNIN_FAIL, payload: resp.message})//the last return is going to be handled by effects
    }
    return Observable.of({type:AuthActions.SIGNIN});
  })

  @Effect()
  authSigninAfter = this.actions$
  .ofType(AuthActions.SIGNIN)
  .switchMap(()=>{
    return fromPromise(firebase.auth().currentUser.getIdToken())
    .catch(error=>{
      console.log("getIdToken error "+ error.message);
      return Observable.of(error);
    })
  })
  .switchMap((resp)=>{
    if (resp instanceof Error){
      return Observable.of({type:AuthActions.SIGNIN_FAIL, payload: resp.message})//the last return is going to be handled by effects
    }else{
      this.router.navigate(['/']);
      return Observable.of({type:AuthActions.SET_TOKEN, payload: resp});//resp here is the token
    }
  })

  @Effect()
  setUserName = this.actions$
  .ofType(AuthActions.SIGNIN)
  .switchMap(()=>{
    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref('users/'+uid);
    return fromPromise(ref.once("value").then(
      (snapshot:firebase.database.DataSnapshot)=>{
          if(snapshot.hasChild("username")) return snapshot.child("username").val()
          else return "";
      }
    ))
  })
  .switchMap(
    (name)=>{
      console.log("after signin get name "+name);
      return Observable.of({type: AuthActions.SET_USERNAME, payload: name})
    }
  )

  @Effect({dispatch: false})//<-- dont dispatch an action at the end
  authLogout = this.actions$
  .ofType(AuthActions.LOGOUT)
  .map(()=>{
    console.log("logout from effects");
    return fromPromise(firebase.auth().signOut())
  })
  .do(
    ()=>{
      this.router.navigate(['/']);
    }
  )

  constructor(private actions$: Actions, private router: Router){}
}
