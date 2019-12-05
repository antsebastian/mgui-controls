import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style } from '@angular/animations';
import { AfterViewInit, Component, ContentChild, ElementRef, HostListener, Input, OnInit, TemplateRef, ViewContainerRef, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ItemContainer } from '../item-container';


@Component({
  selector: 'fit-width',
  template: `<div style="display:table">
      <ng-content></ng-content>
    </div>`,
  animations: []
})
export class ScaleToFitWidth {

  @ContentChild('fitme') content: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event) {

    const e1: HTMLElement = this.content.nativeElement;
    const contentHeight = e1.offsetHeight;
    const contentWidth = e1.offsetWidth;

    const availableHeight = this.el.nativeElement.getBoundingClientRect().height;
    const availableWidth = this.el.nativeElement.getBoundingClientRect().width;

// console.log('availableHeight ' + availableHeight + ' availableWidth '  +
// availableWidth + ' contentHeight ' + contentHeight + ' contentWidth ' + contentWidth);

    const scale = Math.min(
      availableWidth / contentWidth,
      availableHeight / contentHeight
    );

    console.log('scale ' + scale);

    this.content.nativeElement.style.transformOrigin = '0px 0px';
    this.content.nativeElement.style.transform = 'scale(' + scale + ')';
  }


  constructor(private el: ElementRef) {

  }
}

@Component({
  selector: 'slide-div',
  template: `<ng-template [ngTemplateOutlet]="itemTemplate" 
              [ngTemplateOutletContext]="{data: data, slide: slide}"></ng-template>`,
  animations: []
})
export class SlideDiv<T> extends ItemContainer<T> {
  @Input() currTrans = 0;
  @Input() slideid = 0;
  @Input() animatePage = false;
  @Input() slide;

  wrapTrans = 0;
  isWrapAround = false;
  player: AnimationPlayer = null;
  state: string;
  @Output() TransitionComplete = new EventEmitter<T>();

  constructor(public eleRef: ElementRef, private builder: AnimationBuilder) {
    super();
    
  }

  wrapAroundStart(dx: number) {
//    console.log('wrap start ' + this.slideid + '  ' + this.currTrans + ' ' + number);
    this.animateSlide(dx, 0);
  }

  wrapAroundEnd(dx: number) {
    this.isWrapAround = true;
    this.wrapTrans = dx;
  }

  setanimatePage(){
    this.animatePage = true;
  }

  animateSlide(dx: number, time = 250) {

    if (this.player) {


    }

    this.currTrans = dx;

    const timer = time + 'ms ease-in';

    const myAnimation1: AnimationFactory = this.builder.build(animate(timer,
      style({transform: 'translate3d(' + dx + '%, 0, 0)'})));


    this.player = myAnimation1.create(this.eleRef.nativeElement);
    this.player.onDone(() => {

      this.player = null;

      if (this.isWrapAround) {
        this.isWrapAround = false;
        console.log(this.slideid + ' wrap end ' + this.wrapTrans);
        this.animateSlide(this.wrapTrans, 0);
      }

      this.TransitionComplete.next();
      if (this.state === 'entering') {
        this.animatePage = true;
      } else {
        this.animatePage = false;
      }
    });
    this.player.play();
  }
}
