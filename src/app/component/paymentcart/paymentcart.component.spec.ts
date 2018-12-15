import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentcartComponent } from './paymentcart.component';

describe('PaymentcartComponent', () => {
  let component: PaymentcartComponent;
  let fixture: ComponentFixture<PaymentcartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentcartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
