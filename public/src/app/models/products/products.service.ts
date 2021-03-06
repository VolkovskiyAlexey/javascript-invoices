import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {ProductsModel} from './products.model';

@Injectable()
export class ProductsService {

    private API_ROOT = '/api/products';

    constructor(private http: Http) {
    }

    getList(): Observable<ProductsModel[]> {
        return this.http
            .get(this.API_ROOT)
            .map(r => r.json());
    }

    getOne(id: number): Observable<ProductsModel> {
        return this.http.get(`${this.API_ROOT}/${id}`).map((res) => res.json());
    }

    add(fields: ProductsModel): Observable<ProductsModel> {
        return this.http.post(this.API_ROOT, fields).map((res) => res.json());
    }

    edit(id: number, fields: ProductsModel): Observable<ProductsModel> {
        return this.http.put(`${this.API_ROOT}/${id}`, fields).map((res) => res.json());
    }

    remove(id: number) {
        return this.http.delete(`${this.API_ROOT}/${id}`).map((res) => res.json());
    }


}