import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointerPanelWorkspace } from './pointer-panel-workspace';

describe('PointerPanelWorkspace', () => {
  let component: PointerPanelWorkspace;
  let fixture: ComponentFixture<PointerPanelWorkspace>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointerPanelWorkspace ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointerPanelWorkspace);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
