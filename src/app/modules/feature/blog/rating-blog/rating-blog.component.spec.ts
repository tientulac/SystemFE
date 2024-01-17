import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingBlogComponent } from './rating-blog.component';

describe('RatingBlogComponent', () => {
  let component: RatingBlogComponent;
  let fixture: ComponentFixture<RatingBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RatingBlogComponent]
    });
    fixture = TestBed.createComponent(RatingBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
