import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MguiCarouselComponent } from './mgui-carousel.component';

describe('MguiCarouselComponent', () => {
  let component: MguiCarouselComponent;
  let fixture: ComponentFixture<MguiCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MguiCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MguiCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
