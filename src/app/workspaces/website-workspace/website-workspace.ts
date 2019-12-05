import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SetPageAni } from 'libs/mgui-controls/src/animations';

@Component({
  selector: 'website-workspace',
  templateUrl: './website-workspace.html',
  styleUrls: ['./website-workspace.scss'],
  animations: [SetPageAni('animate-page')]
})
export class WebsiteWorkspace implements OnInit, OnDestroy, AfterViewInit {
  
  firstLoad = false;
  ngAfterViewInit(): void {
    this.firstLoad = true;
  }

  @Input()
  slideSrc = [{ fileName: '../../../assets/small-business-parallax-1-1920x1200.jpg', 
                smallText: 'Anthony Sebastian - Front End Web Developer', 
                bigText: 'Welcome to my portfolio' },
  { fileName: '../../../assets/small-business-parallax-2-1920x1200.jpg', 
    smallText: 'I designed this portfolio to demonstrate my skills.', bigText: 'Angular Vue ES6 TypeScript' },
  { fileName: '../../../assets/small-business-parallax-3-1920x1200.jpg', 
  smallText: 'I\'ve been designing web applications for over 10 years.', bigText: 'Designer Developer Architect' }];
  
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
