import {Component, HostBinding, Input} from '@angular/core';
import {MguiSideNavService} from './mgui-side-nav.service';
import {ObservableMedia} from '@angular/flex-layout';

// Base class for workspaces will add more workspace related functionality in the future
@Component({
  selector: 'mgui-workspace',
  templateUrl: './mgui-workspace.html',
  styleUrls: ['./mgui-workspace.scss'] })
export class MguiWorkspace {


  // media$: Observable<MediaChange> = this.mediaService.asObservable();

  @Input() workspaceTitle: string;

  // TODO: work around since workspace is first component under router, and :host is not working under router
  @HostBinding('style.height') ht = '100%';

  constructor(  public appService: MguiSideNavService,
                public mediaService: ObservableMedia ) {

  }
}
