import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternoPage } from './interno.page';

describe('InternoPage', () => {
  let component: InternoPage;
  let fixture: ComponentFixture<InternoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
