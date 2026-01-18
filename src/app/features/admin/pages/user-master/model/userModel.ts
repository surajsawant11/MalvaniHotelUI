export interface UserModel{
    userId : number;
    name : string;
    email:string;
    phone:number;
    createdDt:string;
    createdBy : string;
    updatedDt: string;
    updatedBy:string;
    role : 'ADMIN'|'USER';
}