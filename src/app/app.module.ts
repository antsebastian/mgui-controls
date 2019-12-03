import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatExpansionModule,
  MatListModule, MatGridListModule, MatCardModule, MatMenuModule,
  MatButtonToggleModule, MatSidenavModule, MatProgressBarModule, MatTabsModule,
  MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatTooltipModule
 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { MguiControlsModule } from 'projects/mgui-controls/src/mgui-controls.module';
import { CarouselWorkspace } from './workspaces/carousel-workspace/carousel-workspace'
import {PointerPanelWorkspace} from './workspaces/pointer-panel-workspace/pointer-panel-workspace'
import { MguiSideNavService } from 'projects/mgui-controls/src/mgui-workspace/mgui-side-nav.service';
import {Route, RouterModule, Routes} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ContactsService, ContactsMockService, GamesMockService, CRUDService, GamesService } from './services/app.dataservice';
import {ItemsControlWorkspace} from './workspaces/items-control-workspace/items-control-workspace'
import {SportsbookWorkspace} from './workspaces/sportsbook-workspace/sportsbook-workspace'

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
 {path: 'sportsbook-workspace', component: SportsbookWorkspace},
 indexRoute, fallbackRoute
];

const contactsServiceFactory = (http: HttpClient) => {
  return new ContactsMockService(http);
};

const contactsServiceProvider = {
    provide: ContactsService,
    useFactory: contactsServiceFactory,
    deps: [HttpClient]
  };

  const gamesServiceFactory = (http: HttpClient) => {
    return new GamesMockService(http);
  };
  
  const gamesServiceProvider = {
      provide: GamesService,
      useFactory: gamesServiceFactory,
      deps: [HttpClient]
    };
  
@NgModule({
  declarations: [
    AppComponent,
    CarouselWorkspace, PointerPanelWorkspace, ItemsControlWorkspace, SportsbookWorkspace
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MguiControlsModule, 
    MatToolbarModule, MatButtonModule, MatIconModule, MatExpansionModule,
  MatListModule, MatGridListModule, MatCardModule, MatMenuModule,
  MatButtonToggleModule, MatSidenavModule, MatProgressBarModule, MatTabsModule,
  MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatTooltipModule,
  RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],

  
  providers: [MguiSideNavService, contactsServiceProvider, gamesServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
