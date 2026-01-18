import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { MenuMasterService } from '../services/menu-master.service';
import { MenuItem } from '../model/menu-master.model';

@Component({
  selector: 'app-menu-master-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu-master-list.component.html',
  styleUrl: './menu-master-list.component.css'
})
export class MenuMasterListComponent implements OnInit {

  // ✅ Signals
  menuList = signal<MenuItem[]>([]);
  isLoading = signal<boolean>(false);

  constructor(
    private menuService: MenuMasterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchMenuList();
  }

  fetchMenuList(): void {
    this.isLoading.set(true);

    this.menuService.getAllMenu().subscribe({
      next: (res: MenuItem[]) => {
        this.menuList.set(res ?? []);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.showToast('error', 'Not able to load menu list');
      }
    });
  }

  onEdit(menuId: number | undefined): void {
    if (!menuId) return;
    this.router.navigate(['/admin/menu-master/edit', menuId]);
  }

  onDelete(menuId: number | undefined): void {
    if (!menuId) return;

    Swal.fire({
      title: 'Are you sure?',
      text: 'This menu item will be removed permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e26a00',
      cancelButtonColor: '#888',
      confirmButtonText: 'Yes, Remove'
    }).then((result) => {
      if (!result.isConfirmed) return;

      this.menuService.deleteMenu(menuId).subscribe({
        next: (res: any) => {
          this.showToast('success', res?.message || 'Menu removed successfully');
          this.fetchMenuList();
        },
        error: (e) => {
          this.showToast('error', e?.error?.message || 'Failed to remove menu');
        }
      });
    });
  }

  private showToast(icon: 'success' | 'error', title: string): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon,
      title,
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
    });
  }
}
