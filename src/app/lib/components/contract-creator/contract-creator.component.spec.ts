import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractCreatorComponent } from './contract-creator.component';

describe('ContractCreatorComponent', () => {
  let component: ContractCreatorComponent;
  let fixture: ComponentFixture<ContractCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
