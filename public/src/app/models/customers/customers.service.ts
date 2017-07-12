import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {CustomersModel} from './customers.model';

@Injectable()
export class CustomersService {

    private API_ROOT = '/api/customers';

    constructor(private http: Http) {
    }

    getList(): Observable<CustomersModel[]> {
        return this.http
            .get(this.API_ROOT)
            .map(r => r.json());
    }

    getOne(id: number): Observable<CustomersModel> {
        return this.http.get(`${this.API_ROOT}/${id}`).map((res) => res.json());
    }

    add(fields: CustomersModel): Observable<CustomersModel> {
        return this.http.post(this.API_ROOT, fields).map((res) => res.json());
    }

    edit(id: number, fields: CustomersModel): Observable<CustomersModel> {
        return this.http.put(`${this.API_ROOT}/${id}`, fields).map((res) => res.json());
    }

    remove(id: number) {
        return this.http.delete(`${this.API_ROOT}/${id}`).map((res) => res.json());
    }


}