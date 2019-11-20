import { OnInit, OnDestroy, Input, TemplateRef, Output, EventEmitter, ElementRef, Component } from "@angular/core";

@Component({
    selector: 'item-container',
    template: `<ng-template *ngTemplateOutlet="itemTemplate; context: {$implicit: data}"></ng-template>`
    })
  export class ItemContainer<T> implements OnInit, OnDestroy {

    @Input() itemTemplate: TemplateRef<T>;
    @Input() data: T;
    @Output() selectionChanged: EventEmitter<any> = new EventEmitter();
    public isSelected: boolean;
  
    constructor(private element: ElementRef) {
    }
  
    ngOnDestroy(): void {
    }
    ngOnInit(): void {
    }
}
