import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent, MarkerAdsPipe } from './app.component';

@NgModule({
  declarations: [
    AppComponent, MarkerAdsPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
