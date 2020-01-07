import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {MatSidenav, MatNavList, MatList, MatSelectionList} from '@angular/material';
import {switchMap, takeUntil, first} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import {MediaMonitor, ObservableMedia} from '@angular/flex-layout';
import { MguiSideNavService } from 'libs/mgui-controls/src/mgui-workspace/mgui-side-nav.service';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {

  @Input() toolbarTemplate: TemplateRef<any>;
  @Input() drawerMode: string;
  @Input() loading = false;

  @ViewChild('navList') navList: MatSelectionList;
  @ViewChild('drawer') drawer: MatSidenav;

  protected _onDestroy = new Subject<void>();

  constructor(public appService: MguiSideNavService,           
              public mediaMonitor: MediaMonitor, 
              private mediaService: ObservableMedia,
              private router: Router) 
              { 
                const navSub = router.events.subscribe((event) => {
                  if (event instanceof NavigationStart) {
                    this.loading = true;
                  }
                  if (event instanceof NavigationEnd || 
                      event instanceof NavigationError || 
                      event instanceof NavigationCancel ) {
                    this.loading = false;
                    // TODO: currently a one and done, refactor into resolver service. 
                    navSub.unsubscribe(); //for image preload ONLY,  preload once then its cached and done for the session.
                  }
                })
              }

  ngOnInit(): void {
    
    this.router.navigateByUrl('website-workspace'); //without this line the initial link is not activated.
    
    this.appService.ToggleSideNav
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.drawer.toggle();
      });

      if(this.mediaService.isActive('gt-md')) {
        this.drawer.toggle();
      }

      this.mediaMonitor.observe()
      .pipe(takeUntil(this._onDestroy))
      .subscribe((change) => {
        if (this.mediaService.isActive('lt-lg')) {
          this.drawerMode = 'over';
          if (this.drawer) {
            this.drawer.close();
          }
        } else if (this.mediaService.isActive('gt-md')) {
          this.drawerMode = 'side';
        }
      });

  }

  closeDrawerOnNav() {
    if (this.mediaService.isActive('lt-lg')) {
      this.drawer.toggle();
    }
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}