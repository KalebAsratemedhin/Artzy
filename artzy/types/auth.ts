export interface SignupCredential{
    fullName: string;
    address: string;
    email: string;
    password: string;
    phoneNumber: string;
}

export interface SigninCredential{
    email: string;
    password: string;
}

export interface User{
    fullName: string;
    email: string;
    password: string;
    address: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
    id: number;
}