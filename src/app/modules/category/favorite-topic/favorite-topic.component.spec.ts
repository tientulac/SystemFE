import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteTopicComponent } from './favorite-topic.component';

describe('FavoriteTopicComponent', () => {
  let component: FavoriteTopicComponent;
  let fixture: ComponentFixture<FavoriteTopicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteTopicComponent]
    });
    fixture = TestBed.createComponent(FavoriteTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
