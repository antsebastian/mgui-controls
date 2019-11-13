import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  DEFAULT_BREAKPOINTS,
  BREAKPOINTS,
  BreakPoint,
} from '@angular/flex-layout';

/**
 * Update fxFlex defaults to bootstrap.
 */
function updateBreakpoints(bp: BreakPoint) {
  switch (bp.alias) {
    case 'xs': bp.mediaQuery =  '(min-width: 0px) and (max-width: 575px)'; break;
    case 'sm': bp.mediaQuery =  '(min-width: 576px) and (max-width: 767px)'; break;
    case 'md': bp.mediaQuery =  '(min-width: 768px) and (max-width: 991px)'; break;
    case 'lg': bp.mediaQuery =  '(min-width: 992px) and (max-width: 1199px)'; break;
    case 'xl': bp.mediaQuery =  '(min-width: 1200px) and (max-width: 4999px)'; break;
    case 'lt-sm': bp.mediaQuery =  '(max-width: 575px)'; break;
    case 'lt-md': bp.mediaQuery =  '(max-width: 767px)'; break;
    case 'lt-lg': bp.mediaQuery =  '(max-width: 991px)'; break;
    case 'lt-xl': bp.mediaQuery =  '(max-width: 1199px)'; break;
    case 'gt-xs': bp.mediaQuery =  '(min-width: 576px)'; break;
    case 'gt-sm': bp.mediaQuery =  '(min-width: 768px)'; break;
    case 'gt-md': bp.mediaQuery =  '(min-width: 992px)'; break;
    case 'gt-lg': bp.mediaQuery =  '(min-width: 1200px)'; break;
  }
  return bp;
}

@NgModule({
  imports : [FlexLayoutModule],
  exports : [FlexLayoutModule],
  providers: [
    // register a Custom BREAKPOINT Provider
    {
      provide: BREAKPOINTS,
      useValue : DEFAULT_BREAKPOINTS.map(updateBreakpoints),
      multi: true
    }
  ]
})
export class BootstrapBreakpointsModule { }
