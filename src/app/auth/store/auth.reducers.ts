import * as AuthActions from './auth.actions';

export interface State{
    token : string;
    authenticated : boolean;
    signup_fail_message: string;
    signin_fail_message: string;
}

const initialState: State ={
  token : null,
  authenticated : false,
  signup_fail_message: null,
  signin_fail_message: null
}

export function authReducer(state=initialState, action: AuthActions.AuthActions){
  switch(action.type){
    case AuthActions.SIGNUP_FAIL:
      console.log("sign up failed reducer called");
      return {
        ...state,
        signup_fail_message: action.payload
      }
    case AuthActions.SIGNIN_FAIL:
      console.log("sign in failed reducer called");
      return {
        ...state,
        signin_fail_message: action.payload
      }
    case AuthActions.SIGNUP:
      console.log("sign up reducer called");
    case AuthActions.SIGNIN:
      return{
        ...state,
        authenticated: true,
        signup_fail_message: null,
        signin_fail_message: null
      };
    case AuthActions.LOGOUT:
      console.log("reducer logout");
      return{
        ...state,
        token: null,
        authenticated : false
      };
    case AuthActions.SET_TOKEN:
      console.log("set token reducer called");
      return{
        ...state,
        token: action.payload
      }
    default:
      return state;
  }
}
