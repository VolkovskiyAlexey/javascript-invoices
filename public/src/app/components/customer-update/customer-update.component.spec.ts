import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUpdateComponent } from './customer-update.component';

describe('CustomerUpdateComponent', () => {
  let component: CustomerUpdateComponent;
  let fixture: ComponentFixture<CustomerUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});