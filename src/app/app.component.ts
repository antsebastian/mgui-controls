import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {switchMap, takeUntil} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import {MediaMonitor, ObservableMedia} from '@angular/flex-layout';
import { MguiSideNavService } from 'projects/mgui-controls/src/mgui-workspace/mgui-side-nav.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {

  @Input() toolbarTemplate: TemplateRef<any>;
  @Input() drawerMode: string;

  @ViewChild('drawer') drawer: MatSidenav;

  protected _onDestroy = new Subject<void>();

  constructor(public appService: MguiSideNavService,
              private mediaService: ObservableMedia,
              public mediaMonitor: MediaMonitor) { }

  ngOnInit(): void {
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
          if (this.drawer) {
            this.drawer.open();
          }
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