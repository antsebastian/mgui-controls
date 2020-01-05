import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {MatSidenav, MatNavList, MatList, MatSelectionList} from '@angular/material';
import {switchMap, takeUntil} from 'rxjs/operators';
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
  loading = false;

  @ViewChild('navList') navList: MatSelectionList;
  @ViewChild('drawer') drawer: MatSidenav;

  protected _onDestroy = new Subject<void>();

  constructor(public appService: MguiSideNavService,           
              public mediaMonitor: MediaMonitor, 
              private mediaService: ObservableMedia,
              private router: Router) 
              { 
                router.events.subscribe((event) => {
                  if (event instanceof NavigationStart) {
                    this.loading = true
                  }
                  if (event instanceof NavigationEnd) {
                    this.loading = false
                  }
              
                  // Set loading state to false in both of the below events to hide the spinner in case a request fails
                  if (event instanceof NavigationCancel) {
                    this.loading = false
                  }
                  if (event instanceof NavigationError) {
                    this.loading = false
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