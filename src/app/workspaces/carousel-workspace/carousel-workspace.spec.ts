import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselWorkspaceComponent } from './carousel-workspace';

describe('CarouselWorkspaceComponent', () => {
  let component: CarouselWorkspaceComponent;
  let fixture: ComponentFixture<CarouselWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselWorkspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
