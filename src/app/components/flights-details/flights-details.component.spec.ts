import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsDetailsComponent } from './flights-details.component';

describe('FlightsDetailsComponent', () => {
  let component: FlightsDetailsComponent;
  let fixture: ComponentFixture<FlightsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
