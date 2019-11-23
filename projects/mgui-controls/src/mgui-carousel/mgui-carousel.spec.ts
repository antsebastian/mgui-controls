import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MguiCarousel } from "./MguiCarousel";

describe('MguiCarouselComponent', () => {
  let component: MguiCarousel;
  let fixture: ComponentFixture<MguiCarousel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MguiCarousel ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MguiCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
