import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {ToasterModule} from 'angular2-toaster/angular2-toaster';

import {ROUTES} from './app.routes';
import {LayoutsModule} from './components/common/layouts/layouts.module';

import {AppComponent} from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InvoicesComponent} from './components/invoices/invoices.component';
import {InvoicePageComponent} from './components/invoice-page/invoice-page.component';
import {InvoicesService} from './models/invoices/invoices.service';
import {ProductsService} from './models/products/products.service';
import {CustomersService} from './models/customers/customers.service';
import {InvoiceItmesService} from './models/invoice-items/invoice-items.service';
import { CustomersComponent } from './components/customers/customers.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { CustomerUpdateComponent } from './components/customer-update/customer-update.component';

@NgModule({
  entryComponents: [
    ProductUpdateComponent,
    CustomerUpdateComponent
  ],
  declarations: [
    AppComponent,
    InvoicesComponent,
    InvoicePageComponent,
    CustomersComponent,
    ProductsComponent,
    ProductUpdateComponent,
    CustomerUpdateComponent
  ],
  imports: [
    // Angular
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    ToasterModule,
    NgbModule.forRoot(),

    // Modules
    LayoutsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    InvoicesService,
    ProductsService,
    CustomersService,
    InvoiceItmesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
