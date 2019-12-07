import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatExpansionModule,
  MatListModule, MatGridListModule, MatCardModule, MatMenuModule,
  MatButtonToggleModule, MatSidenavModule, MatProgressBarModule, MatTabsModule,
  MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatTooltipModule
 } from '@angular/material';
 import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { MguiControlsModule } from 'libs/mgui-controls/src/mgui-controls.module';
import { WebsiteWorkspace } from './workspaces/website-workspace/website-workspace'
import {PointerPanelWorkspace} from './workspaces/pointer-panel-workspace/pointer-panel-workspace'
import { MguiSideNavService } from 'libs/mgui-controls/src/mgui-workspace/mgui-side-nav.service';
import {Route, RouterModule, Routes, RouteReuseStrategy} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ContactsService, ContactsMockService, GamesMockService, GamesService } from './services/app.dataservice';
import {ItemsControlWorkspace} from './workspaces/items-control-workspace/items-control-workspace'
import { CacheReuseStrategy } from './route-cache';


const defaultRouteCache = {
    provide: RouteReuseStrategy,
    useClass: CacheReuseStrategy
}
const indexRoute: Route = {
  path: '',
 component: WebsiteWorkspace,
};

const fallbackRoute: Route = {
 path: '**',
 component: WebsiteWorkspace
};

const appRoutes: Routes = [
 {path: 'website-workspace', component: WebsiteWorkspace},
 {path: 'pointerpanel-workspace', component: PointerPanelWorkspace},
 {path: 'itemscontrol-workspace', component: ItemsControlWorkspace},
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
    WebsiteWorkspace, PointerPanelWorkspace, ItemsControlWorkspace
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
  MatProgressSpinnerModule, RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],

  
  providers: [MguiSideNavService, contactsServiceProvider, gamesServiceProvider, defaultRouteCache],
  bootstrap: [AppComponent]
})
export class AppModule { }
