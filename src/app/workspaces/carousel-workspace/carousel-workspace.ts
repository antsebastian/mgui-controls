import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SetPageAni } from 'projects/mgui-controls/src/animations';

@Component({
  selector: 'carousel-workspace',
  templateUrl: './carousel-workspace.html',
  styleUrls: ['./carousel-workspace.scss'],
  animations: [SetPageAni('animate-page')]
})
export class CarouselWorkspace implements OnInit, OnDestroy {

  @Input()
  slideSrc = [{ fileName: '../../../assets/small-business-parallax-1-1920x1200.jpg', smallText: 'Union Bank Welcomes You.', bigText: 'We create stunning websites' },
  { fileName: '../../../assets/small-business-parallax-2-1920x1200.jpg', smallText: 'This is a small line.', bigText: 'We create stunning websites' },
  { fileName: '../../../assets/small-business-parallax-3-1920x1200.jpg', smallText: 'This is a small line.', bigText: 'We create stunning websites' }];
  
  @Input() currLayoutString = 'lg';
  private _onDestroy = new Subject<void>();

  constructor(public mediaService: ObservableMedia) { 
    mediaService.asObservable()
    .pipe(takeUntil(this._onDestroy))
    .subscribe((change) => {
      this.currLayoutString = change.mqAlias;
        console.log('currLayoutString 2' + change.mqAlias);
    });
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
