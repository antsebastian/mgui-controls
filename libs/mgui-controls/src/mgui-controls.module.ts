import {BootstrapBreakpointsModule} from './bootstrap-breakpoints';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatToolbarModule, MatButtonModule, MatIconModule, MatExpansionModule,
  MatListModule, MatGridListModule, MatCardModule, MatMenuModule,
  MatButtonToggleModule, MatSidenavModule, MatProgressBarModule, MatTabsModule,
  MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatTooltipModule
} from '@angular/material';
import { MguiCarousel } from "./mgui-carousel/mgui-carousel";
import {MguiWorkspace} from './mgui-workspace/mgui-workspace'
import { SlideDiv, ScaleToFitWidth } from './mgui-carousel/slide-div';
import { MguiPointerPanelList } from './mgui-pointer-panel-list/mgui-pointer-panel-list';
import { MguiPointerPanelItem } from './mgui-pointer-panel-list/mgui-pointer-panel-item';
import { MguiPointerPanelDetails } from './mgui-pointer-panel-list/mgui-pointer-panel-details';
import { MguiItemsControl } from './items-control';
import { ItemContainer } from './item-container';
import { ItemsPanel } from './items-panel';

@NgModule({
  imports: [BrowserModule, FlexLayoutModule, BrowserAnimationsModule, MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule
  ],
  providers: [BootstrapBreakpointsModule],
  declarations: [ItemsPanel, MguiItemsControl, ItemContainer, MguiWorkspace, MguiCarousel, SlideDiv, ScaleToFitWidth, MguiPointerPanelList, MguiPointerPanelItem, MguiPointerPanelDetails],
  exports: [ItemsPanel, MguiItemsControl, ItemContainer,MguiWorkspace, MguiCarousel,SlideDiv, ScaleToFitWidth, MguiPointerPanelList, MguiPointerPanelItem, MguiPointerPanelDetails]
})
export class MguiControlsModule { }
