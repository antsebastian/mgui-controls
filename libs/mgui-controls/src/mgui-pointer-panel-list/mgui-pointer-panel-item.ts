import {Component, ElementRef, EventEmitter, Input, OnDestroy, Output, TemplateRef, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import { ItemContainer } from '../item-container';


export function InOutAni(name) {
  return trigger(name, [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('1s ease-in-out', style({ opacity: 1 }))
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate('1s ease-in-out', style({ opacity: 0 }))
    ])
  ]);
}

  @Component({
  selector: 'mgui-pointer-panel-item',
  templateUrl: './mgui-pointer-panel-item.html',
  styleUrls: ['./mgui-pointer-panel-item.scss'],
  animations: [ InOutAni('in-out-ani')]
  })
export class MguiPointerPanelItem<T> extends ItemContainer<T> {

  @ViewChild('imageContainer') translatedContainer: ElementRef;

  @Input() itemsPanelTop: number;
  @Input() yTranslate = 385;
  @Input() detailsPanelState = 'close';
  @Output() selectionChanged: EventEmitter<any> = new EventEmitter();
  public isSelected: boolean;

    constructor(private element: ElementRef) {
        super();
    }

    get translatedBottom(): number {
      const rect = this.element.nativeElement.getBoundingClientRect();
      return rect.bottom;
    }

    @Input()
    get bottom(): number {
    const rect = this.element.nativeElement.getBoundingClientRect();

    if (this.element.nativeElement.style.transform &&
        this.element.nativeElement.style.transform === 'translateY(' + this.yTranslate + 'px)') {
      // console.log(this.element.nativeElement.id + ' opened ' + (rect.bottom - this.yTranslate));
      return rect.bottom - this.yTranslate;
    }
      // closed
  return rect.bottom;
  }

  get centerHorz(): number {
    const left = this.element.nativeElement.offsetLeft;
    const rect = this.element.nativeElement.getBoundingClientRect();

    return left + (rect.width * 0.5) - 30;
  }

    ngOnDestroy(): void {
    this.detailsPanelState = 'destroy';
    }

    select() { this.selectionChanged.emit(); }


}
