import { Category } from './category';
export class Creator {
    id?: any;
    userId?: string;
    name?: string;
    creations?: string[] | string;
    categories?: Category | string;
    ciudad?: string;
}
export interface Creator {
    id?: any;
    userId?: string;
    name?: string;
    creations?: string[] | string;
    categories?: Category | string;
    ciudad?: string;
}