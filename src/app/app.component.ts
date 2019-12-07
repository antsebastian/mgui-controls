import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {MatSidenav, MatNavList, MatList, MatSelectionList} from '@angular/material';
import {switchMap, takeUntil} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import {MediaMonitor, ObservableMedia} from '@angular/flex-layout';
import { MguiSideNavService } from 'libs/mgui-controls/src/mgui-workspace/mgui-side-nav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {

  @Input() toolbarTemplate: TemplateRef<any>;
  @Input() drawerMode: string;

  @ViewChild('navList') navList: MatSelectionList;
  @ViewChild('drawer') drawer: MatSidenav;

  protected _onDestroy = new Subject<void>();

  constructor(public appService: MguiSideNavService,           
              public mediaMonitor: MediaMonitor, 
              private mediaService: ObservableMedia,
              private router: Router) { }

  ngOnInit(): void {
    
    this.router.navigateByUrl('website-workspace'); //without this line the initial link is not activated.
    
    this.appService.ToggleSideNav
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.drawer.toggle();
      });

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