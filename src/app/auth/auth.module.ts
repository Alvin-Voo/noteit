import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations:[
      SigninComponent,
      SignupComponent
    ],
    imports:[
      AuthRoutingModule,
      CommonModule,
      FormsModule,
      SharedModule
    ]
})

export class AuthModule{}
