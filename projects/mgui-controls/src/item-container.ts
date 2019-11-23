import { OnInit, OnDestroy, Input, TemplateRef, Output, EventEmitter, ElementRef, Component } from "@angular/core";

@Component({
    selector: 'item-container',
    template: `<ng-template *ngTemplateOutlet="itemTemplate; context: {$implicit: data}"></ng-template>`
    })
  export class ItemContainer<T>  {

    @Input() itemTemplate: TemplateRef<T>;
    @Input() data: T;
    @Output() selectionChanged: EventEmitter<any> = new EventEmitter();
    public isSelected: boolean;
  
    constructor() {
    }
  }
