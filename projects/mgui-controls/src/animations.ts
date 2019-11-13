import { trigger, transition, query, style, stagger, animate, state } from "@angular/animations";

// use *ngIf true to begin this animation
export function SetPageAni(name) {
    return trigger(name, [
      transition(':enter', [
        query('.child', [
          style({opacity: 0, transform: 'translateY(100px)'}),
          stagger(-100, [
            animate('1s cubic-bezier(0.35, 0, 0.25, 1)', style({opacity: 1, transform: 'none'}))
          ])
        ])
      ])
    ]);
  }
  
  export function FadeInAni(name) {
    return trigger(name, [
      state('void', style({
        'opacity': '0'
      })),
      transition(':enter', [
        animate('1s 100ms cubic-bezier(0.35, 0, 0.25, 1)', style({opacity: 1}))
      ])
    ]);
  }
  
  
  // https://github.com/angular/flex-layout/issues/368
  // flex doesn't emit gt or lt.
  export function ResponsiveScaleAni(name) {
    return trigger(name, [
      state('xl, lg, md', style({
        'transform': 'scale(1)'
      })),
      state('sm', style({
        'transform': 'scale(.8)',
        'transform-origin': 'top'
      })),
  
      state('xs', style({
        'transform': 'scale(.7)',
        'transform-origin': 'top'
      })),
  
      transition('* => xl, * => lg, * => md', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')),
      transition('* => sm', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')),
      transition('* => xs', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')),
  
    ]);
  }
  
  