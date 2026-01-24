import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserModel } from '../model/userModel';
import { UsersMasterService } from '../services/users-master.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-master-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './user-master-list.component.html',
  styleUrl: './user-master-list.component.css'
})
export class UserMasterListComponent implements OnInit {
onDelete(userId: number | undefined) {
    if (!userId) return;

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

      this.userService.deleteUser(userId).subscribe({
        next: (res: any) => {
          this.showToast('success', res?.message || 'Menu removed successfully');
          this.fetchUserList();
        },
        error: (e) => {
          this.showToast('error', e?.error?.message || 'Failed to remove menu');
        }
      });
    });
  }
onEdit(userId: number) {
   if (!userId) return;
    this.router.navigate(['/admin/users-master/edit', userId]);
}
  userList =  signal<UserModel[]>([]);
  isLoading = signal<boolean>(false);

  constructor(private userService : UsersMasterService, private  router :Router){};
  ngOnInit(): void {
    this.fetchUserList();
  }
  fetchUserList (): void {
    this.isLoading.set(true);
    this.userService.getUserList().subscribe({
      next : (res)=>{
        this.userList.set(res ?? [] );
        this.isLoading.set(false);


      },
      error : () => {
         this.isLoading.set(false);
        this.showToast('error', 'Not able to load menu list');

      }
    })


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
