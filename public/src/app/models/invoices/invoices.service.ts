import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {InvoicesModel} from './invoices.model';

@Injectable()
export class InvoicesService {

    private API_ROOT = '/api/invoices';

    constructor(private http: Http) {
    }

    getList(): Observable<InvoicesModel[]> {
        return this.http
            .get(this.API_ROOT)
            .map(r => r.json());
    }

    getOne(id: number): Observable<InvoicesModel> {
        return this.http.get(`${this.API_ROOT}/${id}`).map((res) => res.json());
    }

    add(fields: InvoicesModel): Observable<InvoicesModel> {
        return this.http.post(this.API_ROOT, fields).map((res) => res.json());
    }

    edit(id: number, fields: InvoicesModel): Observable<InvoicesModel> {
        return this.http.put(`${this.API_ROOT}/${id}`, fields).map((res) => res.json());
    }

    remove(id: number) {
        return this.http.delete(`${this.API_ROOT}/${id}`).map((res) => res.json());
    }


}