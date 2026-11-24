import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverRow } from './driver-row';

describe('DriverRow', () => {
  let component: DriverRow;
  let fixture: ComponentFixture<DriverRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverRow],
    }).compileComponents();

    fixture = TestBed.createComponent(DriverRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
