import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { UserModel } from '../model/userModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersMasterService {
  // [x: string]: any;
  

  constructor(private api : ApiService) { 

  }

  getUserList(){
    return this.api.get<UserModel[]>('/users')
  }

  saveUser( userForm: any) {
      return this.api.post<UserModel>('/users', userForm);
  }

  updateUser( userId : number , userForm : any){
     return this.api.put<UserModel>(`/users/${userId}`, userForm);
  }

  findById(userId : number){
    return this.api.get<UserModel>(`/users/${userId}`);
  }

  deleteUser(userId : number):Observable<any>{
    return this.api.delete<any>(`/users/${userId}`);
  }
}
