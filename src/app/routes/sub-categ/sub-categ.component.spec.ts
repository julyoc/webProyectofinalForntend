import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategComponent } from './sub-categ.component';

describe('SubCategComponent', () => {
  let component: SubCategComponent;
  let fixture: ComponentFixture<SubCategComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCategComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
