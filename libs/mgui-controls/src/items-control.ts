import { Component, OnInit, Input, ViewChild, ViewChildren, ElementRef, QueryList, OnDestroy, DoCheck, IterableDiffer, IterableDiffers, TemplateRef, AfterContentChecked, AfterViewInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import {concatMap, flatMap, map, take, takeUntil, takeWhile, tap, throttle, timeout} from 'rxjs/operators';
import { Subject, Observable, Subscription, of } from 'rxjs';
import { ItemContainer } from './item-container';

@Component({selector:'mgui-items-control',

 template: `<items-panel>
 <item-container #ic fxFlex *ngFor="let item of (dataStream$ | async); let i = index" id="{{i}}"
                    (selectionChanged)="icSelectionChanged(ic)"
                    [style.z-index]="2"              
                    [itemTemplate]="itemTemplate" [data]="item">
</item-container>
</items-panel>
`})
export class MguiItemsControl<T> implements OnInit, OnDestroy, AfterContentChecked {
  
    constructor(protected readonly differs: IterableDiffers) { }
    @Input() itemTemplate: TemplateRef<T>;
    @Input() itemsPanel: TemplateRef<any>;

    icSelectionChanged(ic) { 
        //todo: implement 
    }

    private _dataDiffer: IterableDiffer<ItemContainer<T>>;
    private _dataSource: Observable<T[]> | T[];
    /** Subscription that listens for the data provided by the data source. */
    private _dataChangeSubscription: Subscription | null;
  
    @Input()
    get dataSource(): Observable<T[]> | T[] {
      return this._dataSource; }
  
    set dataSource(dataSource: Observable<T[]> | T[]) {
      if (this._dataSource !== dataSource) {
        // Stop listening for data from the previous data source.
        if (this._dataChangeSubscription) {
          this._dataChangeSubscription.unsubscribe();
          this._dataChangeSubscription = null;
        }
        this._dataSource = dataSource;
      }
    }
  
    protected _data: T[] | ReadonlyArray<T>;
    get data(): T[] | ReadonlyArray<T> { return this._data; }
  
    dataStream$: Observable<T[] | ReadonlyArray<T>> | undefined;
  
    ngAfterContentChecked(): void {
      if (this.dataSource && !this._dataChangeSubscription) {
          
          if (this.dataSource instanceof Observable) {
              this.dataStream$ = this.dataSource;
            } else if (Array.isArray(this.dataSource)) {
              this.dataStream$ = of(this.dataSource);
            }
      
          if (this.dataStream$ === undefined) {
            throw new Error('datastream undefined.');
          }
        }
    }
      
  protected _onDestroy = new Subject<void>();

  get dataDiffer() {
    return this._dataDiffer;
  }

  ngOnInit() { 
    this._dataDiffer = this.differs.find([]).create();
   }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
