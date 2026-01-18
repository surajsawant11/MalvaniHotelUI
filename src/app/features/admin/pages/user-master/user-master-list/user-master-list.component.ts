import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
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
onDelete(arg0: any) {
throw new Error('Method not implemented.');
}
onEdit(arg0: any) {
throw new Error('Method not implemented.');
}
  userList =  signal<UserModel[]>([]);
  isLoading = signal<boolean>(false);

  constructor(private userService : UsersMasterService){};
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
