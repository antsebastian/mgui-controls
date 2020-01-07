import { Component, OnInit, Input, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { takeUntil, takeWhile, map, tap, mergeMap, flatMap, concatAll, concatMap } from 'rxjs/operators';
import { Subject, interval, forkJoin, Observable, from, of, merge, concat } from 'rxjs';
import { SetPageAni, ResponsiveScaleAni, FadeInAni } from 'libs/mgui-controls/src/animations';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'website-workspace',
  templateUrl: './website-workspace.html',
  styleUrls: ['./website-workspace.scss'],
  animations: [SetPageAni('animate-page'), ResponsiveScaleAni('responsive-scale-ani'), FadeInAni('fade-in-ani')]
})
export class WebsiteWorkspace implements OnInit, OnDestroy, AfterViewInit {
  
  firstLoad = false;
  ngAfterViewInit(): void {
    this.firstLoad = true;
  }

  @Input()
  slideSrc = [{ fileName: '../assets/website/small-business-parallax-1-1920x1200.webp', 
                smallText: 'Hello, I\'m Anthony Sebastian and Modern GUIs is my consulting company for web application development.', 
                bigText: 'UI Designer and Developer' },
  { fileName: '../assets/website/small-business-parallax-2-1920x1200.webp', 
    smallText: 'I create front-end components, frameworks and applications.',
    bigText: 'Angular Vue ES6 TypeScript' },
  { fileName: '../assets/website/small-business-parallax-3-1920x1200.webp', 
  smallText: 'Scroll down to find out more about me and the services I offer.',
  bigText: 'HTML5 CSS3 Flex Grid'}];
  
  @Input() currLayoutString = 'lg';
  private _onDestroy = new Subject<void>();

  @ViewChild('section2') section2: ElementRef;
  @ViewChild('section4') section4: ElementRef;

  @ViewChild('section5') section5: ElementRef;
  @ViewChild('section5Parallax') section5Parallax: ElementRef;


  @ViewChild('wrapper') wrapper: ElementRef;

  @Input() value1 = 20;

  @Input() section4Src = [
    {icon: 'laptop', header: 'Construct It', content: 'Hands-on programming with Angular, Vue, JavaScript, ES6/ES7, TypeScript, HTML5, CSS3.'},
    {
      icon: 'whatshot',
      header: 'Optimize It',
      content: 'Optimized web pages for speed. Good understanding of web optimization techniques.'
    },
    {
      icon: 'phone_iphone',
      header: 'App It',
      content: 'High quality responsive web applications and pages that work well across desktop and mobile platforms.'
    },
    {
      icon: 'share',
      header: 'Architect It',
      content: 'Experience working with and building front end component libraries. Easy-to-use and intuitive API and framework designs.'
    },

  ];


  @Input() section5Src = [
    {
      header: 'Angular Skills',
      value: 20,
      valueTo: 96,
      content: `Experience with Angular 6+, includes RxJS, data store, template referencing and content projection.`
    },
    {
      header: 'TypeScript Skills',
      value: 20,
      valueTo: 94,
      content: `Experience with generic classes, data structures, interfaces and OOP.`
    },
    {
      header: 'Vue Skills',
      value: 20,
      valueTo: 87,
      content: `Experience with Vue, Vuex, watchers, mixins and databinding.`
    },
    {
      header: 'JavaScript Skills',
      value: 20,
      valueTo: 90,
      content: `Experience with ES6/ES7, prototype inheritence, abstraction, polymorphism and closures.`
    },

  ];

  @Input() section6Src = new Array(6);

  fadein2 = false;
  slideUp4 = false;
  slideUp5 = false;

  constructor(public mediaService: ObservableMedia, private route: ActivatedRoute) {
    const imageResolver$ = route.data.pipe( map( data => data.imageResolver ));
    imageResolver$.subscribe();
    
    mediaService.asObservable()
    .pipe(takeUntil(this._onDestroy))
    .subscribe((change) => {
      console.log(change.mqAlias);
        this.currLayoutString = change.mqAlias;
    });
  }
  getClassName(prefix: string) {
    return prefix + this.currLayoutString;
  }

  ngOnInit() {
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
  goToDoc(url = "https://github.com/antsebastian/mgui-controls/wiki/Mgui-Showcase---Website-Workspace"){
    window.open(url, "_blank");
  }
  callMe() {
    window.location.href = 'tel:+1-408-334-4666';
  }
  onScroll(event) {

    //   console.log(this.wrapper.nativeElement.getBoundingClientRect().bottom);
    //  console.log(this.section3.nativeElement.getBoundingClientRect().top);

    if (this.wrapper.nativeElement.getBoundingClientRect().bottom >
      this.section2.nativeElement.getBoundingClientRect().top + 300) {
      if (!this.fadein2) {
        this.fadein2 = true;
      }
    }


    if (this.wrapper.nativeElement.getBoundingClientRect().bottom >
      this.section4.nativeElement.getBoundingClientRect().top + 300) {
      if (!this.slideUp4) {
        this.slideUp4 = true;
      }
    }
    const currTop = this.section5.nativeElement.getBoundingClientRect().top - this.wrapper.nativeElement.getBoundingClientRect().top;
    const scrollY = (currTop * .25);

    // console.log(`div ${currTop} parallax delta ${scrollY}`);

    if (this.wrapper.nativeElement.getBoundingClientRect().bottom >
      this.section5.nativeElement.getBoundingClientRect().top) {


      if (this.section5Parallax) {
        this.section5Parallax.nativeElement.style.top = `${scrollY - 200}px`;
      }
    }

    if (this.wrapper.nativeElement.getBoundingClientRect().bottom >
      this.section5.nativeElement.getBoundingClientRect().top + 300) {

      if (!this.slideUp5) {
        this.slideUp5 = true;

        let index = 0;
        interval(150)
          .pipe(takeWhile(() => index < this.section5Src.length ))
          .subscribe(_ => {

            const spinner = this.section5Src[index++];
            // pipe - building an Observable chain down from the source to the sink

            // matspinner doesn't update the circle that fast,
            // timing faster than 75 will make circle out of sink with the value
            interval(10)
              .pipe(takeWhile(_ => spinner.value !== spinner.valueTo), map(_ => spinner.value++))
              .subscribe();
          });
      }
    }
  }

}
