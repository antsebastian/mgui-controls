import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatToolbarModule, MatButtonModule, MatIconModule, MatExpansionModule,
  MatListModule, MatGridListModule, MatCardModule, MatMenuModule,
  MatButtonToggleModule, MatSidenavModule, MatProgressBarModule, MatTabsModule,
  MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatTableModule
} from '@angular/material';
import { MguiCarouselComponent } from '../mgui-carousel/mgui-carousel.component';
import {MguiWorkspace} from '../mgui-workspace/mgui-workspace'
import { SlideDiv, ScaleToFitWidth } from '../mgui-carousel/slide-div';

@NgModule({
  imports: [BrowserModule, FlexLayoutModule, BrowserAnimationsModule, MatToolbarModule, MatButtonModule, MatIconModule
  ],
  declarations: [MguiWorkspace, MguiCarouselComponent, SlideDiv, ScaleToFitWidth],
  exports: [MguiWorkspace, MguiCarouselComponent,SlideDiv, ScaleToFitWidth]
})
export class MguiControlsModule { }
