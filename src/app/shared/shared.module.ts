import { NgModule } from "@angular/core";
import { MatButtonModule, MatListModule, MatToolbarModule, MatInputModule, MatIconModule, MatFormFieldModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations:[],
  exports:[
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule
  ]
})

export class SharedModule{}
