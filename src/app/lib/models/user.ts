export class User {
    uid?: any;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: 'admin' | 'creator' |  'client';
    customClaims?: {
        role?: 'admin' | 'creator' |  'client',
        name?: string,
        username?: string
    }
}


export interface User {
    uid?: any;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: 'admin' | 'creator' |  'client';
    customClaims?: {
        role?: 'admin' | 'creator' |  'client',
        name?: string,
        username?: string
    }
}

