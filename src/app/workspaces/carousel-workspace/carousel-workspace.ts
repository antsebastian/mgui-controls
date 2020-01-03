import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'carousel-workspace',
  templateUrl: './carousel-workspace.html',
  styleUrls: ['./carousel-workspace.scss']
})
export class CarouselWorkspace implements OnInit, OnDestroy {

  //data bound. fileName displays and transitions images.   
  @Input() myData = [
    { 
      fileName: '../../../assets/website/portfolio-grid-1-800x650.webp',
      someText: 'My Template - Slide 1'
    },    
    { 
      fileName: '../../../assets/website/portfolio-grid-2-800x650.webp',
      someText: 'My Template - Slide 2'
    }, 
    { 
      fileName: '../../../assets/website/portfolio-grid-3-800x650.webp',
      someText: 'My Template - Slide 3'
    }, 
    { 
      fileName: '../../../assets/website/portfolio-grid-4-800x650.webp',
      someText: 'My Template - Slide 4'
    }, 
    { 
      fileName: '../../../assets/website/portfolio-grid-5-800x650.webp',
      someText: 'My Template - Slide 5'
    }, 
 
];

  @Input() currLayoutString = 'lg';
  private _onDestroy = new Subject<void>();

  constructor(public mediaService: ObservableMedia) {
    mediaService.asObservable()
    .pipe(takeUntil(this._onDestroy))
    .subscribe((change) => {
        this.currLayoutString = change.mqAlias;
    });
  }

  goToDoc() {
    window.open("https://github.com/antsebastian/mgui-controls/wiki/mgui-carousel", "_blank");
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