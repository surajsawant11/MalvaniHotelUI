export interface UserModel{
    userId : number;
    name : string;
    email:string;
    phone:string;
    createdDt:string;
    createdBy : string;
    updatedDt: string;
    updatedBy:string;
    role : 'ADMIN'|'USER';
    message : string;
}