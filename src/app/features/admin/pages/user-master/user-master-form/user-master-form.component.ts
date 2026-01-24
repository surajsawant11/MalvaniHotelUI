import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsersMasterService } from '../services/users-master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-master-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-master-form.component.html',
  styleUrl: './user-master-form.component.css'
})
export class UserMasterFormComponent implements OnInit{
// menuForm: any;
editId = signal<number | null>(null);

resetForm() {
  this.userForm.reset({
    userId: null,
    name: '',
    phone: '',
    email: '',
    role: 'USER'
  });
  this.isEditMode.set(false);
  this.editId.set(null);
}


  isEditMode = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  
  
  constructor(private fb : FormBuilder, private usersService : UsersMasterService, private activatedRoute: ActivatedRoute){}
  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if(idParam){
      const id = Number(idParam);
      this.editId.set(id);
      this.isEditMode.set(true);
      this.loadUserById(id);
    }
  }

  private loadUserById(id: number): void {
    this.isLoading.set(true);

    this.usersService.findById(id).subscribe({
      next: (res: any) => {
        this.userForm.patchValue({
          userId : res?.userId,
          name: res?.name,
          phone: res?.phone,
          email: res?.email,
          role: res?.role
        });

        this.isLoading.set(false);
      },
      error: (e : any) => {
        this.isLoading.set(false);
        this.showToast('error', e?.error?.message || 'Failed to load menu data');
      }
    });
  }

  userForm = this.fb.group({
    userId : [null as number | null],
    name :['',[Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    email : ['', [Validators.email, Validators.required ]],
    role : ['USER', Validators.required]
  })

  submit() {
  if (this.userForm.invalid) {
    this.userForm.markAllAsTouched();
    return;
  }

  this.isLoading.set(true);

  const request$ = this.isEditMode()
    ? this.usersService.updateUser(this.editId()!, this.userForm.getRawValue())
    : this.usersService.saveUser(this.userForm.getRawValue());

  request$.subscribe({
    next: (res) => {
      this.isLoading.set(false);
      this.showToast(
        'success',
        res?.message || (this.isEditMode() ? 'User Updated Successfully' : 'User Added Successfully')
      );

      if (!this.isEditMode()) {
        this.resetForm();
      }
    },
    error: (e) => {
      this.isLoading.set(false);
      this.showToast('error', e?.error?.message || 'Operation failed');
    }
  });
}


private showToast(icon: 'success' | 'error', title: string): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon,
      title,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  }
}
