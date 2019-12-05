import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteWorkspace } from './website-workspace';

describe('CarouselWorkspace', () => {
  let component: WebsiteWorkspace;
  let fixture: ComponentFixture<WebsiteWorkspace>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteWorkspace ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteWorkspace);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
