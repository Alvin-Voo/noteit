import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from '../store/app.reducers';
import * as AuthActions from '../auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  authenticated = false;
  authStore: Subscription;

  constructor(private store : Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.authStore = this.store.select('auth')
    .subscribe(
      authState =>{
        this.authenticated = authState.authenticated
      }
    )
  }

  ngOnDestroy(){
    if(this.authStore) this.authStore.unsubscribe();
  }

  onSignOut(){
    this.store.dispatch(new AuthActions.Logout());
  }

}
