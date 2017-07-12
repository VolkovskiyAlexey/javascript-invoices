import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../models/products/products.service';
import {ProductsModel} from '../../models/products/products.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductUpdateComponent} from '../product-update/product-update.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products = <ProductsModel[]> [];

  constructor(private productsService: ProductsService,
              private modalService: NgbModal) {

  }

  ngOnInit() {

    this.productsService.getList()
      .subscribe((res) => {
        this.products = res;
      });

  }


  // =================================================
  // Actions
  // =================================================


  edit(product: ProductsModel) {

    const modalRef = this.modalService.open(ProductUpdateComponent);
    modalRef.componentInstance.product = product;

  }

  add() {

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


}
