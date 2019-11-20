import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CRUDService, CRUDBehaviourService } from 'src/app/services/app.dataservice';

@Component({
  selector: 'items-control-workspace',
  templateUrl: './items-control-workspace.html',
  styleUrls: ['./items-control-workspace.scss']
})
export class ItemsControlWorkspace implements OnInit, OnDestroy {

  itemService = new CRUDBehaviourService<string>(null);
  items$ = this.itemService.getItems(); // subscribed in  html

  addCard(index: number) {
      this.itemService.addItem(`item ${index}`);
  }
  removeCard(data: string) {
    this.itemService.deleteItem(data);
  }

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
    
    this.items$ = this.itemService.getItems();

    for(let i=0; i < 3; i++) {
      this.addCard(i);
    }
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
