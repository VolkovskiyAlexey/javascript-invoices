import {BaseModel} from '../base/base.model';
export class InvoicesModel extends BaseModel {
    id?: number;
    customer_id?: number;
    discount? = 0;
    total? = 0;
}
