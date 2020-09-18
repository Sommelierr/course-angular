import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcoholDetailsComponent } from './alcohol-details.component';

describe('AlcoholDetailsComponent', () => {
  let component: AlcoholDetailsComponent;
  let fixture: ComponentFixture<AlcoholDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlcoholDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlcoholDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
