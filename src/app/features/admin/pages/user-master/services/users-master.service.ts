import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { UserModel } from '../model/userModel';

@Injectable({
  providedIn: 'root'
})
export class UsersMasterService {

  constructor(private api : ApiService) { 

  }

  getUserList(){
    return this.api.get<UserModel[]>('/users')
  }

}
