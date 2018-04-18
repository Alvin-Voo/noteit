import { Component, OnInit } from '@angular/core';
import * as config from './config/config';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(){}

  ngOnInit(){
    firebase.initializeApp({
      apiKey: config.config.apiKey,
      authDomain: config.config.authDomain
    })
  }
}
