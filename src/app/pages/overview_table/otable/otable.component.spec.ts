import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtableComponent } from './otable.component';

describe('OtableComponent', () => {
  let component: OtableComponent;
  let fixture: ComponentFixture<OtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
