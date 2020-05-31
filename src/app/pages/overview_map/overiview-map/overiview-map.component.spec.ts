import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OveriviewMapComponent } from './overiview-map.component';

describe('OveriviewMapComponent', () => {
  let component: OveriviewMapComponent;
  let fixture: ComponentFixture<OveriviewMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OveriviewMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OveriviewMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
