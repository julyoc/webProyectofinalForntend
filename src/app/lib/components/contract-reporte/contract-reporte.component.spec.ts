import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractReporteComponent } from './contract-reporte.component';

describe('ContractReporteComponent', () => {
  let component: ContractReporteComponent;
  let fixture: ComponentFixture<ContractReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractReporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
