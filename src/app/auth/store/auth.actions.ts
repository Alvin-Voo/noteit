import { Action } from "@ngrx/store";

export const SIGNUP_FAIL = 'SIGNUP_FAIL';
export const SIGNIN_FAIL = 'SIGNIN_FAIL';
export const TRY_SIGNUP = 'TRY_SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const CREATE_USERDB = 'CREATE_USERDB';
export const SET_USERNAME = 'SET_USERNAME';


export class SignupFail implements Action{
  readonly type = SIGNUP_FAIL;

  constructor(public payload: string){};
}

export class SigninFail implements Action{
  readonly type = SIGNIN_FAIL;

  constructor(public payload: string){};
}

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;

  constructor(public payload:{email: string, password: string}){}
}

export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;

  constructor(public payload:{email: string, password: string}){}
}

export class Signup implements Action{
  readonly type = SIGNUP;
}
export class Signin implements Action{
  readonly type = SIGNIN;
}
export class Logout implements Action{
  readonly type = LOGOUT;
}
export class SetToken implements Action{
  readonly type = SET_TOKEN;

  constructor(public payload: string){
  }
}

export class CreateUserDB implements Action{
  readonly type = CREATE_USERDB;

  constructor(public payload: string){}
}

export class SetUserName implements Action{
  readonly type = SET_USERNAME;

  constructor(public payload: string){}
}

export type AuthActions = Signin | Signup | Logout | SetToken | TrySignup | TrySignin | SignupFail | SigninFail | CreateUserDB | SetUserName;
