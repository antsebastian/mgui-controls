import { Component, OnInit, Input, ViewChild, ViewChildren, ElementRef, QueryList, OnDestroy } from '@angular/core';
import { SlideDiv } from './slide-div';
import { ObservableMedia } from '@angular/flex-layout';
import {concatMap, flatMap, map, take, takeUntil, takeWhile, tap, throttle, timeout} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SetPageAni, ResponsiveScaleAni, FadeInAni } from '../animations';


@Component({
  selector: 'lib-mgui-carousel',
  templateUrl: './mgui-carousel.component.html',
  styleUrls: ['./mgui-carousel.component.scss'],
  animations: [SetPageAni('animate-page'), ResponsiveScaleAni('responsive-scale-ani'), FadeInAni('fade-in-ani')]
})
export class MguiCarouselComponent implements OnInit, OnDestroy {

  private _onDestroy = new Subject<void>();

  @ViewChild('rotator') rotator: ElementRef;
  
  @ViewChildren(SlideDiv) slides: QueryList<SlideDiv>;

  @Input() slideSrc = [{smallText: 'Union Bank Welcomes You.', bigText: 'We create stunning websites'},
    {smallText: 'This is a small line.', bigText: 'We create stunning websites'},
    {smallText: 'This is a small line.', bigText: 'We create stunning websites'}];


  @Input() currLayoutString: string;
  slideIndex = 0;

  get slideCount() {
    return this.slides.length;
  }

  moveOffset = 100;

  constructor(public mediaService: ObservableMedia) { 
    mediaService.asObservable()
    .pipe(takeUntil(this._onDestroy))
    .subscribe((change) => {
      this.currLayoutString = change.mqAlias;
    });

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

  getClassName(prefix: string) {
    return prefix + this.currLayoutString;
  }

  
  isPlaying(): boolean {
    let playing = false;
    this.slides.forEach((slide) => {
      if (slide.player) {
        playing = true;
      }
    });

    return playing;
  }

  selSlide(slideIndex: number) {

    if (this.isPlaying()) {
      return;
    }

    const idx = (this.slideIndex) % this.slideCount;
    const arr = this.slides.toArray();
    const enteringSlide = arr[slideIndex];

    if (slideIndex > idx) {

      enteringSlide.animateSlide(-(this.moveOffset * slideIndex), 0);

      for (let i = idx; i < slideIndex; i++) {
        const slideToWrap = arr[i];
        slideToWrap.animateSlide(this.moveOffset, 0);
      }
    } else if (slideIndex < idx) {

      for (let i = slideIndex; i < idx; i++) {

        const slideToWrap = arr[i];
        slideToWrap.animateSlide(-this.moveOffset, 0);
      }

      enteringSlide.animateSlide((this.moveOffset * slideIndex), 0);

    }

    this.slideIndex = slideIndex;
  }

  prevSlide() {

    if (this.isPlaying()) {
      return;
    }
    const leavingIndex = (this.slideIndex) % this.slideCount;

    this.slideIndex--;
    if (this.slideIndex === -1) {
      this.slideIndex = this.slideCount - 1;
    }

    const enteringIndex = (this.slideIndex) % this.slideCount;
    const enteringSlide = this.slides.toArray()[enteringIndex];

    enteringSlide.wrapAroundStart(enteringSlide.currTrans - (this.moveOffset * this.slideCount));

    let i = 0;
    this.slides.forEach((slide) => {

      if (i === enteringIndex) {
        slide.state = 'entering';
      } else if (i === leavingIndex) {
        slide.state = 'leaving';
      }

      slide.animateSlide(slide.currTrans + this.moveOffset);
      i++;
    });
  }

  nextSlide() {

    if (this.isPlaying()) {
      return;
    }

    const leavingIndex = (this.slideIndex) % this.slideCount;
    this.slideIndex++;

    const enteringIndex = (this.slideIndex) % this.slideCount;

    let i = 0;
    this.slides.forEach((slide) => {

      if (i === enteringIndex) {
        slide.state = 'entering';
      } else if (i === leavingIndex) {
        slide.state = 'leaving';
      }

      slide.animateSlide(slide.currTrans - this.moveOffset);
      i++;
    });

    const leavingSlide = this.slides.toArray()[leavingIndex];
    leavingSlide.wrapAroundEnd(leavingSlide.currTrans + (this.moveOffset * this.slideCount));
  }

}
