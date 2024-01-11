import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicTypeComponent } from './topic-type.component';

describe('TopicTypeComponent', () => {
  let component: TopicTypeComponent;
  let fixture: ComponentFixture<TopicTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopicTypeComponent]
    });
    fixture = TestBed.createComponent(TopicTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
