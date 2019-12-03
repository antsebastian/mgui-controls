import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsbookWorkspace } from './sportsbook-workspace';

describe('PointerPanelWorkspace', () => {
  let component: SportsbookWorkspace;
  let fixture: ComponentFixture<SportsbookWorkspace>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportsbookWorkspace ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsbookWorkspace);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
