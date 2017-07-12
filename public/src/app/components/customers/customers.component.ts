import {Component, OnInit} from '@angular/core';
import {CustomersService} from '../../models/customers/customers.service';
import {CustomersModel} from '../../models/customers/customers.model';
import {CustomerUpdateComponent} from '../customer-update/customer-update.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  public customers = <CustomersModel[]> [];

  constructor(private customersService: CustomersService,
              private modalService: NgbModal) {
  }

  ngOnInit() {

    this.customersService.getList()
      .subscribe((res) => {
        this.customers = res;
      });

  }

  // =================================================
  // Actions
  // =================================================


  edit(customer: CustomersModel) {

    const modalRef = this.modalService.open(CustomerUpdateComponent);
    modalRef.componentInstance.customer = customer;

  }

  add() {

    const customer = new CustomersModel();

    const modalRef = this.modalService.open(CustomerUpdateComponent);
    modalRef.componentInstance.customer = customer;
    modalRef.result
      .then((res) => {
        this.customers.push(res);
      })
      .catch(() => {
      })

  }
}
