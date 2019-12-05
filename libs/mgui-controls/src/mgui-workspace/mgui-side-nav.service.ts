import {EventEmitter, Injectable, Output} from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class MguiSideNavService {

  @Output() ToggleSideNav: EventEmitter<any> = new EventEmitter();

  constructor() {  }

  toggle(): void {
    this.ToggleSideNav.emit();
  }
}

