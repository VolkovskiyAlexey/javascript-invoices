import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductsModel} from '../../models/products/products.model';
import {ProductsService} from '../../models/products/products.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  @Input() product = new ProductsModel();

  constructor(public activeModal: NgbActiveModal,
              private productsService: ProductsService) {

  }

  ngOnInit() {
  }

  save() {

    if (this.product.id) {
      this.productsService.edit(this.product.id, this.product)
        .subscribe((res) => {
          this.activeModal.close(res);
        });
    } else {
      this.productsService.add(this.product)
        .subscribe((res) => {
          this.activeModal.close(res);
        });
    }
  }
}
