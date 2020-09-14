import { Creator } from './creator';

export class Rate {
    id?: any;
    creatorId?: string | Creator;
    name?: string;
    price?: number;
    benefits?: string[];
    type?: 'basic' | 'premiun' | 'gold';
}

export interface Rate {
    id?: any;
    creatorId?: string | Creator;
    name?: string;
    price?: number;
    benefits?: string[];
    type?: 'basic' | 'premiun' | 'gold';
}