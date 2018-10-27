import { Moment } from 'moment';
import { IOrderItem } from 'app/shared/model//order-item.model';
import { ICustomer } from 'app/shared/model//customer.model';

export const enum OrderStatus {
    COMPLETED = 'COMPLETED',
    PENDING = 'PENDING',
    CANCELLED = 'CANCELLED'
}

export interface IProductOrder {
    id?: number;
    placedDate?: Moment;
    status?: OrderStatus;
    invoiceId?: number;
    code?: string;
    orderItems?: IOrderItem[];
    customer?: ICustomer;
}

export class ProductOrder implements IProductOrder {
    constructor(
        public id?: number,
        public placedDate?: Moment,
        public status?: OrderStatus,
        public invoiceId?: number,
        public code?: string,
        public orderItems?: IOrderItem[],
        public customer?: ICustomer
    ) {}
}
