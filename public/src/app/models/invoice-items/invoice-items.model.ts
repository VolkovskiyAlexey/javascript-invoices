import {BaseModel} from '../base/base.model';
export class InvoiceItemsModel extends BaseModel {
    id?: number;
    invoice_id?: number;
    product_id?: number;
    quantity? = 1;
}
