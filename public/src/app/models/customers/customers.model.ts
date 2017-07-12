import {BaseModel} from '../base/base.model';
export class CustomersModel extends BaseModel {
    id?: number;
    name: string;
    address: string;
    phone: string;
}
