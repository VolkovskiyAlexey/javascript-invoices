import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {InvoiceItemsModel} from "./invoice-items.model";

@Injectable()
export class InvoiceItmesService {

  private API_ROOT = '/api/invoices';

  constructor(private http: Http) {
  }

  getList(invoiceId): Observable<InvoiceItemsModel[]> {
    return this.http
      .get(`${this.API_ROOT}/${invoiceId}/items`)
      .map(r => r.json());
  }

  getOne(invoiceId: number, id: number): Observable<InvoiceItemsModel> {
    return this.http.get(`${this.API_ROOT}/${invoiceId}/items/${id}`).map((res) => res.json());
  }

  add(invoiceId: number, fields: InvoiceItemsModel): Observable<InvoiceItemsModel> {
    return this.http.post(`${this.API_ROOT}/${invoiceId}/items`, fields).map((res) => res.json());
  }

  edit(id: number, invoiceId: number, fields: InvoiceItemsModel): Observable<InvoiceItemsModel> {
    return this.http.put(`${this.API_ROOT}/${invoiceId}/items/${id}`, fields).map((res) => res.json());
  }

  remove(id: number, invoiceId: number) {
    return this.http.delete(`${this.API_ROOT}/${invoiceId}/items/${id}`).map((res) => res.json());
  }


}
