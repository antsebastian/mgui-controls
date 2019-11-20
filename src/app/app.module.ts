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
import { MguiControlsModule } from 'projects/mgui-controls/src/mgui-controls.module';
import { CarouselWorkspace } from './workspaces/carousel-workspace/carousel-workspace'
import {PointerPanelWorkspace} from './workspaces/pointer-panel-workspace/pointer-panel-workspace'
import { MguiSideNavService } from 'projects/mgui-controls/src/mgui-workspace/mgui-side-nav.service';
import {Route, RouterModule, Routes} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ContactsMockService, CRUDService } from './services/app.dataservice';
import {ItemsControlWorkspace} from './workspaces/items-control-workspace/items-control-workspace'

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
 {path: 'pointerpanel-workspace', component: PointerPanelWorkspace},
 {path: 'itemscontrol-workspace', component: ItemsControlWorkspace},
 indexRoute, fallbackRoute
];

const contactsServiceFactory = (http: HttpClient) => {
  return new ContactsMockService(http);
};

const contactsServiceProvider = {
    provide: CRUDService,
    useFactory: contactsServiceFactory,
    deps: [HttpClient]
  };


@NgModule({
  declarations: [
    AppComponent,
    CarouselWorkspace, PointerPanelWorkspace, ItemsControlWorkspace
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    MguiControlsModule, 
    MatToolbarModule, MatButtonModule, MatIconModule, MatExpansionModule,
  MatListModule, MatGridListModule, MatCardModule, MatMenuModule,
  MatButtonToggleModule, MatSidenavModule, MatProgressBarModule, MatTabsModule,
  MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatTableModule,
  RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],

  
  providers: [MguiSideNavService, contactsServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
