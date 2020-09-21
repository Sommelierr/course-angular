import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcoholEditComponent } from './alcohol-edit.component';

describe('AlcoholEditComponent', () => {
  let component: AlcoholEditComponent;
  let fixture: ComponentFixture<AlcoholEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlcoholEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
