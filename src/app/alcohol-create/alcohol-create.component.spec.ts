import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {  AlcoholCreateComponent } from './alcohol-create.component';

describe('AlcoholCreateComponent', () => {
  let component: AlcoholCreateComponent;
  let fixture: ComponentFixture<AlcoholCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlcoholCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
