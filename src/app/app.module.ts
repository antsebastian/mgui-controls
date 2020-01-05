import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
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
import { WebsiteWorkspace } from './workspaces/website-workspace/website-workspace';
import { CarouselWorkspace } from './workspaces/carousel-workspace/carousel-workspace';
import { LibraryWorkspace } from './workspaces/library-workspace/library-workspace';
import { EmptyWorkspace } from './workspaces/empty-workspace/empty-workspace';

import {PointerPanelWorkspace} from './workspaces/pointer-panel-workspace/pointer-panel-workspace'
import { MguiSideNavService } from 'libs/mgui-controls/src/mgui-workspace/mgui-side-nav.service';
import {Route, RouterModule, Routes, RouteReuseStrategy} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ContactsService, ContactsMockService, GamesMockService, GamesService } from './services/app.dataservice';
import {ItemsControlWorkspace} from './workspaces/items-control-workspace/items-control-workspace'
import { CacheReuseStrategy } from './route-cache';

import { HammerGestureConfig } from "@angular/platform-browser";
import * as hammer from "hammerjs";
import { MguiImageResolverService } from './services/mgui-image-resolver.service';
 
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    swipe: { direction: hammer.DIRECTION_HORIZONTAL },
    pinch: { enable: false },
    rotate: { enable: false }
  };
};

const hammerProvider = {
  provide: HAMMER_GESTURE_CONFIG,
  useClass: MyHammerConfig
};

const defaultRouteCache = {
    provide: RouteReuseStrategy,
    useClass: CacheReuseStrategy
};
const indexRoute: Route = {
  path: '',
 component: WebsiteWorkspace,
};

const fallbackRoute: Route = {
 path: '**',
 component: WebsiteWorkspace
};

const webSitePreloads = ['../assets/website/small-business-parallax-1-1920x1200.webp', 
  '../assets/website/small-business-parallax-2-1920x1200.webp', 
  '../assets/website/small-business-parallax-3-1920x1200.webp',
  '../assets/website/about-me-1-1920x1100.webp',
  '../assets/website/about-me-parallax-1-1920x1100.webp',
  '../assets/website/companies/bcbs.png',
  '../assets/website/companies/vms.jpg',
  '../assets/website/companies/bofa.png',
  '../assets/website/companies/canon.png'
];

const appRoutes: Routes = [
 {path: 'website-workspace', component: WebsiteWorkspace, data: {preloads: webSitePreloads}, resolve: {imageResolver: MguiImageResolverService} },
 {path: 'library-workspace', component: LibraryWorkspace, resolve: {imageResolver: MguiImageResolverService}},
 {path: 'carousel-workspace', component: CarouselWorkspace},
 {path: 'pointer-panel-workspace', component: PointerPanelWorkspace},
 {path: 'items-control-workspace', component: ItemsControlWorkspace},
 {path: 'empty-workspace', component: EmptyWorkspace},

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
    EmptyWorkspace, LibraryWorkspace, CarouselWorkspace, WebsiteWorkspace, PointerPanelWorkspace, ItemsControlWorkspace
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

  
  providers: [ hammerProvider, MguiSideNavService, contactsServiceProvider, gamesServiceProvider, defaultRouteCache, MguiImageResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
