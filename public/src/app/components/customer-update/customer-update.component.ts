import {Component, Input, OnInit} from '@angular/core';
import {CustomersModel} from '../../models/customers/customers.model';
import {CustomersService} from '../../models/customers/customers.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {

  @Input() customer = new CustomersModel();

  constructor(public activeModal: NgbActiveModal,
              private customersService: CustomersService) {

  }

  ngOnInit() {
  }

  save() {

    if (this.customer.id) {
      this.customersService.edit(this.customer.id, this.customer)
        .subscribe((res) => {
          this.activeModal.close(res);
        });
    } else {
      this.customersService.add(this.customer)
        .subscribe((res) => {
          this.activeModal.close(res);
        });
    }
  }
  
}
