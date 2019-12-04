import {

  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

export function SetPointerAni(name, from, to) {
  return trigger(name, [
    state('from', style({
      'transform': 'translateX({{from}}px)'
    }), {params : { from: '0' }}),
    state('to', style({
      'transform': 'translateX({{to}}px)'
    }), {params : { to: '300' }}),

    // TODO: leaving this in for now even though it doesn't animate
    transition('from => to', animate('0ms', )),
  ]);
}

export function SetRevealAni(name) {
  return trigger(name, [
    state('open', style({
      'transform': 'scaleY(0)'
    })),
    state('close', style({
      'transform': 'scaleY(1)'
    })),
    state('closeNow', style({
      'transform': 'scaleY(1)'
    })),

    state('reopen', style({
      'transform': 'scaleY(0)'
    })),
    transition('* => open', animate('200ms ease-in')),
    transition('* => close', animate('200ms ease-out')),
    transition('* => closeNow', animate('0ms')),
    transition('* => reopen',
      animate('600ms ease-in', keyframes([
        style({ transform: 'scaleY(1)', offset: 0 }),
        style({ transform: 'scaleY(0)', offset: 1 })
        ])
      ))
  ]);
}

@Component({
  selector: 'mgui-pointer-panel-details',
  templateUrl: './mgui-pointer-panel-details.html',
  styleUrls: ['./mgui-pointer-panel-details.scss'],
  animations: [ SetRevealAni('animate-reveal'),
                SetPointerAni('animate-pointer', 'pointerFrom', 'pointerTo') ]
})
export class MguiPointerPanelDetails<T> {

  @Output() close = new EventEmitter();

  @Input() pointerWidth = 0;
  @Input() pointerHeight = 0;
  @Input() pointerFrom = 0; // used in pointer animation
  @Input() pointerTo = 0; // used in pointer animation
  @Input() pointerState = 'from'; // TODO: refactor hard coding of states
  @Input() panelState = 'close';

  @Input() itemDetailsTemplate: TemplateRef<T>;
  @Input() data: T;

  constructor() {
  }

  @Input()
  set pointerX(value: number) {
    // kick off pointer animation move from current position to new position
    this.pointerTo = value;
    this.pointerState = 'to';
  }

  // reset animation state so nextSlide time 'to' state runs its 'from' this position.
  handleDone() {
      this.pointerFrom = this.pointerTo;
      this.pointerState = 'from';
  }
}
