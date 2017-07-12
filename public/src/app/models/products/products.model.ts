import {BaseModel} from '../base/base.model';
export class ProductsModel extends BaseModel {
    id?: number;
    name: string;
    price: number;
}
