import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatExpansionModule,
  MatListModule, MatGridListModule, MatCardModule, MatMenuModule,
  MatButtonToggleModule, MatSidenavModule, MatProgressBarModule, MatTabsModule,
  MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatTableModule
 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { MguiControlsModule } from 'projects/mgui-controls/src/lib/mgui-controls.module';
import { CarouselWorkspace } from './workspaces/carousel-workspace/carousel-workspace'
import { MguiSideNavService } from 'projects/mgui-controls/src/mgui-workspace/mgui-side-nav.service';
import {Route, RouterModule, Routes} from '@angular/router';

const indexRoute: Route = {
  path: '',
 component: CarouselWorkspace
};

const fallbackRoute: Route = {
 path: '**',
 component: CarouselWorkspace
};

const appRoutes: Routes = [
 {path: 'carousel-workspace', component: CarouselWorkspace},
 indexRoute, fallbackRoute
];

@NgModule({
  declarations: [
    AppComponent,
    CarouselWorkspace,
  ],
  imports: [
    
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MguiControlsModule,
    MatToolbarModule, MatButtonModule, MatIconModule, MatExpansionModule,
  MatListModule, MatGridListModule, MatCardModule, MatMenuModule,
  MatButtonToggleModule, MatSidenavModule, MatProgressBarModule, MatTabsModule,
  MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatTableModule,
  RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  
  providers: [MguiSideNavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
