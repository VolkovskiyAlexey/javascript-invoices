import {Routes} from '@angular/router';

import {BasicComponent} from './components/common/layouts/basic.component';
import {NotFoundComponent} from './components/common/layouts/not-found.component';
import {InvoicesComponent} from './components/invoices/invoices.component';
import {InvoicePageComponent} from './components/invoice-page/invoice-page.component';
import {CustomersComponent} from './components/customers/customers.component';
import {ProductsComponent} from './components/products/products.component';


export const ROUTES: Routes = [
  // App views
  {
    path: '', component: BasicComponent,
    children: [
      {path: '', component: InvoicesComponent},
      {path: 'invoices-new', component: InvoicePageComponent},
      {path: 'invoices/:invoiceId', component: InvoicePageComponent},

      {path: 'customers', component: CustomersComponent},
      {path: 'products', component: ProductsComponent},
    ]
  },


  // Handle all other routes
  {path: '**', component: NotFoundComponent}
];
