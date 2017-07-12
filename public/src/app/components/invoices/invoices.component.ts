import {Component, OnInit} from '@angular/core';
import {InvoicesModel} from '../../models/invoices/invoices.model';
import {InvoicesService} from '../../models/invoices/invoices.service';
import {ProductsModel} from '../../models/products/products.model';
import {ProductsService} from '../../models/products/products.service';
import {CustomersModel} from '../../models/customers/customers.model';
import {CustomersService} from '../../models/customers/customers.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  // models

  public customers = <CustomersModel[]> [];
  public customersById: { [id: number]: CustomersModel } = {};
  public invoices = <InvoicesModel[]> [];

  constructor(private invoicesService: InvoicesService,
              private customersService: CustomersService) {
  }

  ngOnInit() {

    this.invoicesService.getList()
      .subscribe((res) => {
        this.invoices = res;
      });


    this.customersService.getList()
      .subscribe((res) => {
        this.customers = res;
        this.customers.forEach((customer) => {
          this.customersById[customer.id] = customer;
        });
      });

  }

}
