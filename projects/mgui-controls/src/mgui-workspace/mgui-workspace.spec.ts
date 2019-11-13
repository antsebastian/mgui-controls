import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MguiWorkspaceComponent } from './mgui-workspace';

describe('MguiWorkspaceComponent', () => {
  let component: MguiWorkspaceComponent;
  let fixture: ComponentFixture<MguiWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MguiWorkspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MguiWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
