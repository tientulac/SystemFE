import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreenSpinnerComponent } from './full-screen-spinner.component';

describe('FullScreenSpinnerComponent', () => {
  let component: FullScreenSpinnerComponent;
  let fixture: ComponentFixture<FullScreenSpinnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FullScreenSpinnerComponent]
    });
    fixture = TestBed.createComponent(FullScreenSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
