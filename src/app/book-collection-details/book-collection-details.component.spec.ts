import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCollectionDetailsComponent } from './book-collection-details.component';

describe('BookCollectionDetailsComponent', () => {
  let component: BookCollectionDetailsComponent;
  let fixture: ComponentFixture<BookCollectionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCollectionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCollectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
