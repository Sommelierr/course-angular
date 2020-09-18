import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {  AlcoholCollectionDetailsComponent } from './alcohol-collection-details.component';

describe('AlcoholCollectionDetailsComponent', () => {
  let component: AlcoholCollectionDetailsComponent;
  let fixture: ComponentFixture<AlcoholCollectionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlcoholCollectionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlcoholCollectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
