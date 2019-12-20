import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselWorkspace } from './library-workspace';

describe('CarouselWorkspace', () => {
  let component: CarouselWorkspace;
  let fixture: ComponentFixture<CarouselWorkspace>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselWorkspace ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselWorkspace);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
