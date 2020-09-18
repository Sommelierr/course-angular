import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCollectionComponent } from './collection-edit.component'

describe('EditCollectionComponent', () => {
  let component: EditCollectionComponent;
  let fixture: ComponentFixture<EditCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
