import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

import * as _ from 'lodash';

import {ProductsService} from '../../models/products/products.service';
import {ProductsModel} from '../../models/products/products.model';
import {InvoicesService} from '../../models/invoices/invoices.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {CustomersService} from '../../models/customers/customers.service';
import {CustomersModel} from '../../models/customers/customers.model';
import {InvoicesModel} from '../../models/invoices/invoices.model';
import {InvoiceItmesService} from '../../models/invoice-items/invoice-items.service';
import {InvoiceItemsModel} from '../../models/invoice-items/invoice-items.model';
import {CustomerUpdateComponent} from '../customer-update/customer-update.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductUpdateComponent} from '../product-update/product-update.component';

@Component({
  selector: 'app-invoice-page',
  templateUrl: './invoice-page.component.html',
  styleUrls: ['./invoice-page.component.scss']
})
export class InvoicePageComponent implements OnInit {

  public readonly DEBOUNCE_TIME = 500;

  public invoiceId = null;

  // models

  public products = <ProductsModel[]> [];
  public productsById: { [id: number]: ProductsModel } = {};

  public customers = <CustomersModel[]> [];

  // form groups

  public invoiceFormGroup: FormGroup;
  public newInvoiceItemFormGroup: FormGroup;
  public invoiceItemsFormArray: FormArray;
  public invoiceItemsFormGroup: FormGroup;

  constructor(private productsService: ProductsService,
              private invoicesService: InvoicesService,
              private customersService: CustomersService,
              private invoiceItemsService: InvoiceItmesService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              public fb: FormBuilder) {
  }

  ngOnInit() {

    // init forms

    this.initInvoiceFormGroup();
    this.initInvoiceItemsFormArray();
    this.initNewInvoiceItemFormGroup();

    // load data and pass to forms

    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.invoiceId = params.get('invoiceId');

        if (this.invoiceId) {
          this.loadInvoice();
        }
      });

    this.productsService.getList()
      .subscribe((res) => {
        this.products = res;
        this.products.forEach((product) => {
          this.productsById[product.id] = product;
        });

        this.initNewInvoiceItemFormGroup();
      });

    this.customersService.getList()
      .subscribe((res) => {
        this.customers = res;

        // select first customer from list as default
        if (!this.invoiceId) {
          this.invoiceFormGroup.patchValue({customer_id: this.customers[0].id}, {emitEvent: false});
        }
      });

  }


  // =================================================
  // Actions
  // =================================================

  createCustomer() {

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


  createProduct() {

    const product = new ProductsModel();

    const modalRef = this.modalService.open(ProductUpdateComponent);
    modalRef.componentInstance.product = product;
    modalRef.result
      .then((res) => {
        this.products.push(res);
      })
      .catch(() => {
      })
  }


  createInvoice() {

    const invoice = <InvoicesModel> this.invoiceFormGroup.getRawValue();

    this.invoicesService.add(invoice)
      .subscribe(
        (res) => {
          this.router.navigate(['/invoices', res.id]);
        },
        (err) => {
          console.log(err);
        }
      )

  }

  updateInvoice() {

    if (!this.invoiceId) {
      return false;
    }

    this.calcTotal();

    const invoice = <InvoicesModel> this.invoiceFormGroup.getRawValue();

    this.invoicesService.edit(this.invoiceId, invoice)
      .subscribe(
        (res) => {
          this.initInvoiceFormGroup(res);
        },
        (err) => {
          console.log(err);
        }
      )

  }

  createInvoiceItem() {

    if (!this.invoiceId) {
      alert('Save Invoice first');
      return false;
    }

    this.invoiceItemsService.add(this.invoiceId, this.newInvoiceItemFormGroup.getRawValue())
      .subscribe((res) => {
        this.invoiceItemsFormArray.push(
          this.initInvoiceItemFormGroup(res)
        );

        this.updateInvoice(); // reCalc total & save

        this.initNewInvoiceItemFormGroup();
      });

  }

  updateInvoiceItem(invoiceItem: InvoiceItemsModel) {

    this.invoiceItemsService.edit(invoiceItem.id, this.invoiceId, invoiceItem)
      .subscribe(
        (res) => {
          invoiceItem = res;
          this.updateInvoice(); // reCalc total & save
        },
        (err) => {
          console.log(err);
        }
      );

  }

  removeInvoiceItem(invoiceItem: InvoiceItemsModel) {

    this.invoiceItemsService.remove(invoiceItem.id, this.invoiceId)
      .subscribe(
        () => {
          const index = _.findIndex(this.invoiceItemsFormArray.getRawValue(), {id: invoiceItem.id});
          this.invoiceItemsFormArray.removeAt(index);

          this.updateInvoice(); // reCalc total
        },
        (err) => {
          console.log(err);
        }
      );

  }


  // =================================================
  // FormGroups (init/update)
  // =================================================


  protected initInvoiceFormGroup(invoice?: InvoicesModel) {

    if (!this.invoiceFormGroup) {
      this.invoiceFormGroup = this.fb.group({
        id: [],
        customer_id: [],
        discount: [],
        total: []
      });

      // default model

      if (!invoice) {
        invoice = new InvoicesModel();
        invoice.id = null;
        invoice.customer_id = null;
      }

      this.invoiceFormGroup.valueChanges
        .debounceTime(this.DEBOUNCE_TIME)
        .subscribe(() => {
          this.updateInvoice();
        });
    }

    if (invoice) {
      this.invoiceFormGroup.setValue({
        id: invoice.id,
        customer_id: invoice.customer_id,
        discount: invoice.discount,
        total: invoice.total,
      }, {emitEvent: false});
    }

    return this.invoiceFormGroup;
  }

  protected initInvoiceItemsFormArray(invoiceItems: InvoiceItemsModel[] = []) {

    if (!this.invoiceItemsFormArray) {
      this.invoiceItemsFormArray = this.fb.array([]);

      this.invoiceItemsFormGroup = this.fb.group({
        invoiceItems: this.invoiceItemsFormArray
      })
    }

    this.invoiceItemsFormArray.reset([]);

    if (invoiceItems.length) {
      invoiceItems.forEach((invoiceItem) => {
        this.invoiceItemsFormArray.push(
          this.initInvoiceItemFormGroup(invoiceItem)
        );
      });
    }

    return this.invoiceItemsFormArray;
  }

  protected initInvoiceItemFormGroup(invoiceItem: InvoiceItemsModel) {

    const invoiceItemFG = this.fb.group({
      id: invoiceItem.id,
      quantity: invoiceItem.quantity,
      product_id: invoiceItem.product_id,
    });

    invoiceItemFG.valueChanges
      .debounceTime(this.DEBOUNCE_TIME)
      .subscribe((res) => {
        this.updateInvoiceItem(res);
      });

    return invoiceItemFG;

  }

  protected initNewInvoiceItemFormGroup() {

    if (!this.newInvoiceItemFormGroup) {
      this.newInvoiceItemFormGroup = this.fb.group({
        quantity: [],
        product_id: [],
      });
    }

    const newInvoiceItem = new InvoiceItemsModel();
    newInvoiceItem.product_id = this.products.length ? this.products[0].id : null;

    this.newInvoiceItemFormGroup.setValue(newInvoiceItem, {emitEvent: false});

  }


  // =================================================
  // Functions
  // =================================================


  protected loadInvoice() {

    this.invoicesService.getOne(this.invoiceId)
      .subscribe((res) => {
        this.initInvoiceFormGroup(res);
      });

    this.invoiceItemsService.getList(this.invoiceId)
      .subscribe((res) => {
        this.initInvoiceItemsFormArray(res);
      });

  }

  protected calcTotal() {

    const invoiceItems = <InvoiceItemsModel[]> this.invoiceItemsFormArray.getRawValue();

    let total = 0;
    invoiceItems.forEach((item) => {
      total += item.quantity * this.productsById[item.product_id].price;
    });

    total = total * (1 - this.invoiceFormGroup.controls['discount'].value / 100);

    this.invoiceFormGroup.patchValue({total: total}, {emitEvent: false});

  }

}
