import { Component, OnInit, Input, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { takeUntil, takeWhile, map } from 'rxjs/operators';
import { Subject, interval } from 'rxjs';
import { SetPageAni, ResponsiveScaleAni, FadeInAni } from 'libs/mgui-controls/src/animations';

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
  slideSrc = [{ fileName: '../../../assets/website/small-business-parallax-1-1920x1200.jpg', 
                smallText: 'Anthony Sebastian - Front End Web Developer', 
                bigText: 'Welcome to my portfolio' },
  { fileName: '../../../assets/website/small-business-parallax-2-1920x1200.jpg', 
    smallText: 'I designed this portfolio to demonstrate my skills.', bigText: 'Angular Vue ES6 TypeScript' },
  { fileName: '../../../assets/website/small-business-parallax-3-1920x1200.jpg', 
  smallText: 'I\'ve been designing web applications for over 10 years.', bigText: 'Designer Developer Architect' }];
  
  @Input() currLayoutString = 'lg';
  private _onDestroy = new Subject<void>();

  @ViewChild('section2') section2: ElementRef;
  @ViewChild('section4') section4: ElementRef;

  @ViewChild('section5') section5: ElementRef;
  @ViewChild('section5Parallax') section5Parallax: ElementRef;


  @ViewChild('wrapper') wrapper: ElementRef;

  @Input() value1 = 20;

  @Input() section4Src = [
    {icon: 'laptop', header: 'Web Design', content: 'The team of Medium offers web design and development services at affordable rates.'},
    {
      icon: 'whatshot',
      header: 'Branding',
      content: 'Let us create a one-of-a-kind brand identity for your company to drive positive experiences and engagement.'
    },
    {
      icon: 'phone_iphone',
      header: 'App Development',
      content: 'Our web development team can create an elegant web app for any platform that fits your brand.'
    },
    {
      icon: 'share',
      header: 'Content Creation',
      content: 'Our copywriters and content managers will create proper content for your website.'
    },

  ];


  @Input() section5Src = [
    {
      header: 'Web Services',
      value: 20,
      valueTo: 96,
      content: `A set of online marketing services offered by Medium includes SEO & SMM as well as PR solutions.`
    },
    {
      header: 'Web Services',
      value: 20,
      valueTo: 94,
      content: `A set of online marketing services offered by Medium includes SEO & SMM as well as PR solutions.`
    },
    {
      header: 'Web Services',
      value: 20,
      valueTo: 87,
      content: `A set of online marketing services offered by Medium includes SEO & SMM as well as PR solutions.`
    },
    {
      header: 'Web Services',
      value: 20,
      valueTo: 90,
      content: `A set of online marketing services offered by Medium includes SEO & SMM as well as PR solutions.`
    },

  ];

  @Input() section6Src = new Array(6);

  fadein2 = false;
  slideUp4 = false;
  slideUp5 = false;

  constructor(public mediaService: ObservableMedia) { 
    mediaService.asObservable()
    .pipe(takeUntil(this._onDestroy))
    .subscribe((change) => {
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
