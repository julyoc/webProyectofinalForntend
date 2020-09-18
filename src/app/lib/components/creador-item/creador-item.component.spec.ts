import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreadorItemComponent } from './creador-item.component';

describe('CreadorItemComponent', () => {
  let component: CreadorItemComponent;
  let fixture: ComponentFixture<CreadorItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreadorItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreadorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
