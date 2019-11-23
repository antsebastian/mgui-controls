import {
  AfterContentChecked,
  AfterViewInit, ChangeDetectionStrategy,
  Component, DoCheck, ElementRef,
  Input, IterableDiffer, IterableDiffers,
  OnDestroy,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {ViewportRuler} from '@angular/cdk/scrolling';
import {MguiPointerPanelDetails} from './mgui-pointer-panel-details';
import {Observable, of, Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MguiPointerPanelItem} from './mgui-pointer-panel-item';
import { ItemsControl } from '../items-control';

export function MoveRowAni(name, to) {
  return trigger(name, [
    state('closeNow', style({
      'transform': 'translateY(0px)'
    })),

    state('close', style({
      'transform': 'translateY(0px)'
    })),
    state('open', style({
      'transform': 'translateY({{to}}px)'
    }), {params : { to: '0' }}),
    state('openNow', style({
      'transform': 'translateY({{to}}px)'
    }), {params : { to: '0' }}),

    transition('* => open', animate('200ms ease-in')),
    transition('* => close', animate('200ms ease-out')),
    transition('* => openNow', animate('0ms')),
    transition('* => closeNow', animate('0ms')),
    transition('* => void', animate('100ms ease-out')),
  ]);
}


@Component({
  selector: 'mgui-pointer-panel-list',
  templateUrl: './mgui-pointer-panel-list.html',
  styleUrls: ['./mgui-pointer-panel-list.scss'],
  animations: [MoveRowAni('animate-row-move', 'detailsRowHeight')],
//  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MguiPointerPanelList<T> extends ItemsControl<T> implements OnInit, OnDestroy, AfterViewInit, AfterContentChecked, DoCheck {
  constructor(private ruler: ViewportRuler, protected readonly differs: IterableDiffers) {
    super(differs);
  }

  @Input() detailsRowHeight = 385;

  @Input()
  set detailsPanelState(_state: string) {
    this.detailsPanel.panelState = _state;
  }
  get detailsPanelState(): string {
    if (this.detailsPanel) {
      return this.detailsPanel.panelState;
    } else { return 'close'; }
  }

  @Input() itemDetailsTemplate: TemplateRef<T>;

  @ViewChild(MguiPointerPanelDetails) detailsPanel: MguiPointerPanelDetails<T>;
  @ViewChild('gridcontainer') gridContainer: ElementRef;
  @ViewChildren(MguiPointerPanelItem) listViewChildren: QueryList<MguiPointerPanelItem<T>>;

  private _selectedIndex = -1;

  detailsPanelTop = 0;
  detailsPointerLeft = 0;


  icSelectionChanged(icSel: MguiPointerPanelItem<T>): void {

    if (!this.detailsPanel) { return; }

    const icPrev = this.getItem(this._selectedIndex);

    const gridScrolledTop = this.gridContainer.nativeElement.getBoundingClientRect().top - this.gridContainer.nativeElement.offsetTop;
    const selIndex = this.listViewChildren.toArray().indexOf(icSel);

    if (this._selectedIndex === selIndex) { // same card selected...close row
      icSel.isSelected = false;
      this._selectedIndex = -1;
      this.detailsPanelState = 'close';
      this.detailsPanel.data = null;
      const belows = this.listViewChildren.filter(ic => ic.translatedBottom > icSel.translatedBottom);
      for (const ibc of belows) {
        ibc.detailsPanelState = 'close';
      }
    } else if (!icPrev) { // no card selected...new row
      icSel.isSelected = true;
      this._selectedIndex = selIndex;
      this.detailsPanel.data = icSel.data;

      const belows = this.listViewChildren.filter(ic => ic.translatedBottom > icSel.translatedBottom);
      for (const ibc of belows) {
        ibc.detailsPanelState = 'open';
      }
      this.detailsPanelState = 'open';
      this.detailsPanelTop = icSel.translatedBottom - gridScrolledTop - 10;

    } else {  // different card selection... check row
      icPrev.isSelected = false;
      icSel.isSelected = true;
      this._selectedIndex = selIndex;
      this.detailsPanel.data = icSel.data;
      if (icPrev.translatedBottom > icSel.translatedBottom) { // over
        this.detailsPanelTop = icSel.translatedBottom - gridScrolledTop - 10;
        const belows = this.listViewChildren.filter(ic => ic.translatedBottom > icSel.translatedBottom);
        for (const ibc of belows) {
          ibc.detailsPanelState = 'open';
        }
      } else if (icPrev.translatedBottom < icSel.translatedBottom) {  // under
        this.detailsPanelTop = (icSel.translatedBottom - gridScrolledTop) - this.detailsRowHeight - 10;

        const aboves = this.listViewChildren.filter(ic => ic.translatedBottom <= icSel.translatedBottom);
        for (const ibc of aboves) {
          ibc.detailsPanelState = 'close';
        }

      }
      // else... selecting different card on same row
    }

    this.detailsPointerLeft = icSel.centerHorz;
  }

protected getItem(index: number) {
  let icSel = null;
  if (index !== -1) {
    if (this.listViewChildren.length > index) {
      icSel = this.listViewChildren.toArray()[index];
    } else {
      icSel = this.listViewChildren.last;
    }
  }
  return icSel;
}

  protected setDetailPanelPosition() {

    if (!this.listViewChildren) {
      return;
    }

    const icSel = this.getItem(this._selectedIndex);

    if (icSel) {
      const gridScrolledTop = this.gridContainer.nativeElement.getBoundingClientRect().top -
        this.gridContainer.nativeElement.offsetTop;

      const evens = this.listViewChildren.filter(ic => ic.bottom === icSel.bottom);
      for (const ic of evens) { ic.detailsPanelState = 'closeNow'; }

      const belows = this.listViewChildren.filter(ic => ic.bottom > icSel.bottom);
      for (const ic of belows) { ic.detailsPanelState = 'openNow'; }

      this.detailsPanelTop = icSel.bottom - gridScrolledTop - 10;
      this.detailsPointerLeft = icSel.centerHorz;
      // icSel.ScrollIntoView();
    }
  }

  closeDetailsPanel() {
    this._selectedIndex = -1;

    this.detailsPanelState = 'close';
    this.listViewChildren.forEach((ibc) => {
      ibc.detailsPanelState = 'close';
      ibc.isSelected = false;
    });
    this.detailsPanel.data = null;
  }


  ngOnInit(): void {
    super.ngOnInit();
    this.ruler.change().pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.setDetailPanelPosition();
    });
  }

  ngAfterViewInit(): void {

    this.listViewChildren.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      setTimeout(() => {this.setDetailPanelPosition(); });
    });

    this.detailsPanel.close.pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
      this.closeDetailsPanel();
    });
  }

}


