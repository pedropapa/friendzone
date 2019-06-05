import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarregarDadosPage } from './carregar-dados.page';

describe('CarregarDadosPage', () => {
  let component: CarregarDadosPage;
  let fixture: ComponentFixture<CarregarDadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarregarDadosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarregarDadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
