import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifycationComponent } from './notifycation.component';

describe('NotifycationComponent', () => {
  let component: NotifycationComponent;
  let fixture: ComponentFixture<NotifycationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotifycationComponent]
    });
    fixture = TestBed.createComponent(NotifycationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
