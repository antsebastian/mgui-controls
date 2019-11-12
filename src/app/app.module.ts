import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material';

import { AppComponent } from './app.component';
import { MguiControlsModule } from 'projects/mgui-controls/src/lib/mgui-controls.module'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MguiControlsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
