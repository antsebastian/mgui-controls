import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class MguiSideNavService {

  @Output() ToggleSideNav: EventEmitter<any> = new EventEmitter();

  constructor() {  }

  toggle(): void {
    this.ToggleSideNav.emit();
  }
}

