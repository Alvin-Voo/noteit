import { NgModule } from "@angular/core";
import { MatButtonModule, MatListModule,
  MatToolbarModule, MatInputModule,
  MatIconModule, MatFormFieldModule,
  MatDialogModule, MatCardModule} from "@angular/material";
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
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule
  ],
  providers: [
    { provide: 'LOCALSTORAGE', useFactory: getLocalStorage }
]
})

export class SharedModule{}

export function getLocalStorage() {
    return (typeof window !== "undefined") ? window.localStorage : null;
}
