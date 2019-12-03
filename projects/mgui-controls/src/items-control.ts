import { Component, OnInit, Input, ViewChild, ViewChildren, ElementRef, QueryList, OnDestroy, DoCheck, IterableDiffer, IterableDiffers, TemplateRef, AfterContentChecked, AfterViewInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import {concatMap, flatMap, map, take, takeUntil, takeWhile, tap, throttle, timeout} from 'rxjs/operators';
import { Subject, Observable, Subscription, of } from 'rxjs';
import { ItemContainer } from './item-container';

@Component({selector:'items-control',

 template: `<items-panel>
 <item-container #ic fxFlex *ngFor="let item of (dataStream$ | async); let i = index" id="{{i}}"
                    (selectionChanged)="icSelectionChanged(ic)"
                    [style.z-index]="2"              
                    [itemTemplate]="itemTemplate" [data]="item">
</item-container>
</items-panel>
`})
export class ItemsControl<T> implements OnInit, OnDestroy, DoCheck, AfterContentChecked {
    constructor(protected readonly differs: IterableDiffers) { }
    @Input() itemTemplate: TemplateRef<T>;
    @Input() itemsPanel: TemplateRef<any>;

    icSelectionChanged(ic) { 

    }

    @ViewChildren(ItemContainer) itemContainers: QueryList<ItemContainer<T>>;
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
        this._observeRenderChanges();
      }
    }
  
    private _observeRenderChanges() {
      // If no data source has been set, there is nothing to observe for changes.
      if (!this.dataSource) {
        return;
      }
  
    //  let dataStream: Observable<T[] | ReadonlyArray<T>> | undefined;
  
      if (this.dataSource instanceof Observable) {
        this.dataStream$ = this.dataSource;
      } else if (Array.isArray(this.dataSource)) {
        this.dataStream$ = of(this.dataSource);
      }
  
      if (this.dataStream$ === undefined) {
        throw new Error('datastream undefined.');
      }
    }
  
  onItemAdded(item) { }
  onItemRemoved(item) { }

  ngDoCheck(): void {

     if (this.itemContainers) {
      const changes = this._dataDiffer.diff(this.itemContainers.toArray());

      if (changes) {

        changes.forEachAddedItem((record) => {
          this.onItemAdded(record);
        //  console.log('forEachAddedItem ' + record);
          // this.renderer.addClass(this.host.nativeElement, record.item);
          //this.setDetailPanelPosition();
        });

        changes.forEachRemovedItem((record) => {
          this.onItemRemoved(record);

          //          console.log('forEachRemovedItem ' + record);

          // this.closeDetailsPanel();
          return; // only handles single item deletion for now.
        });
      }
    }
  }
  
  protected _onDestroy = new Subject<void>();

  get itemContainerCount() {
    return this.itemContainers.length;
  }

  ngOnInit() { 
    this._dataDiffer = this.differs.find([]).create();
   }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
