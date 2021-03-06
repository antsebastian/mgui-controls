import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'empty-workspace',
  templateUrl: './empty-workspace.html',
  styleUrls: ['./empty-workspace.scss']
})
export class EmptyWorkspace implements OnInit, OnDestroy {

  @Input() currLayoutString = 'lg';
  private _onDestroy = new Subject<void>();
  links = ['Tab1', 'Tab2'];
  activeLink = this.links[0];

  constructor(public mediaService: ObservableMedia) {
    mediaService.asObservable()
    .pipe(takeUntil(this._onDestroy))
    .subscribe((change) => {
        this.currLayoutString = change.mqAlias;
    });
  }

  goToDoc() {
    window.open("https://github.com/antsebastian/mgui-controls/wiki/mgui-workspace", "_blank");
  }

  getClassName(prefix: string) {
    return prefix + this.currLayoutString;
  }


  ngOnInit() {
  
    // get the current size in case the view activates in
    // overlapped breakpoint then fx mediaService doesnt set anything in observable
    // fx bug????
    if (!this.currLayoutString) {

      if (this.mediaService.isActive('xs')) {
        this.currLayoutString = 'xs';
      }
      if (this.mediaService.isActive('sm')) {
        this.currLayoutString = 'sm';
      }
      if (this.mediaService.isActive('md')) {
        this.currLayoutString = 'md';
      }
      if (this.mediaService.isActive('lg')) {
        this.currLayoutString = 'lg';
      }
      if (this.mediaService.isActive('xl')) {
        this.currLayoutString = 'xl';
      }
    }
  }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
