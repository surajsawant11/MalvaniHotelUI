import { Injectable } from '@angular/core';
// import { ApiService } from ;
import { MenuItem } from '../model/menu-master.model';
import { ApiService } from '../../../../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class MenuMasterService {
  deleteMenu(menuId: number) {
    return this.api.delete<(string)>(`/menu/${menuId}`);
  }

  constructor( private api : ApiService) { }

  getAllMenu(){
    return this.api.get<(MenuItem[])>('/menu');
  }

  saveMenu(menu : MenuItem){
    return this.api.post<any>('/menu/save',menu);
  }

  findById(menuId : number){
    return this.api.get<any>(`/menu/${menuId}`);
  }
}
