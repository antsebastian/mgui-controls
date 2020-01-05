import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { takeUntil, map, delay, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'library-workspace',
  templateUrl: './library-workspace.html',
  styleUrls: ['./library-workspace.scss']
})
export class LibraryWorkspace implements OnInit, OnDestroy {


  @Input() currLayoutString = 'lg';
  private _onDestroy = new Subject<void>();

  constructor(public mediaService: ObservableMedia, private route: ActivatedRoute) {

    const res = route.data.pipe(tap(data => console.log(data))).subscribe(d => console.log(d));
   
    //
    // res.subscribe(w=>console.log(w));
    
   // console.log(route.data);

    mediaService.asObservable()
    .pipe(takeUntil(this._onDestroy))
    .subscribe((change) => {
        this.currLayoutString = change.mqAlias;
    });
  }

  goToDoc() {
    window.open('https://github.com/antsebastian/mgui-controls/wiki', '_blank');
  }
  getClassName(prefix: string) {
    return prefix + this.currLayoutString;
  }

  ngOnInit() {
  
    console.log('init');
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