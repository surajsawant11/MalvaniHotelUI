import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../../../core/services/api.service';
import { MenuItem } from '../model/menu-master.model';

@Injectable({
  providedIn: 'root'
})
export class MenuMasterService {

  constructor(private api: ApiService) {}

  // ✅ Get all menu items
  getAllMenu(): Observable<MenuItem[]> {
    return this.api.get<MenuItem[]>('/menu');
  }

  // ✅ Save new menu item
  saveMenu(menu: FormData): Observable<any> {
    return this.api.post<any>('/menu/save', menu);
  }

  // ✅ Update menu item
  updateMenu(menuId: number, menu: FormData): Observable<any> {
    return this.api.put<any>(`/menu/${menuId}`, menu);
    // if backend uses /menu/update then replace endpoint accordingly
  }

  // ✅ Find menu by id
  findById(menuId: number): Observable<MenuItem> {
    return this.api.get<MenuItem>(`/menu/${menuId}`);
  }

  // ✅ Delete menu
  deleteMenu(menuId: number): Observable<any> {
    return this.api.delete<any>(`/menu/${menuId}`);
  }
}
