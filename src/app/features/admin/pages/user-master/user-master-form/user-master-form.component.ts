import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsersMasterService } from '../services/users-master.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-master-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './user-master-form.component.html',
  styleUrl: './user-master-form.component.css'
})
export class UserMasterFormComponent implements OnInit{
// menuForm: any;
editId = signal<number | null>(null);
previewImage: string | null =null;
selectedFile!: File | null;

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
          role: res?.role,
          imageUrl: res?.imageUrl || null
          
        });

        this.isLoading.set(false);
        this.previewImage = res?.imageUrl || null;
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
    role : ['USER', Validators.required],
    image: [null as File | null],
    imageUrl:[null as String|null]
  })

  submit() {
  if (this.userForm.invalid) {
    this.userForm.markAllAsTouched();
    return;
  }

  this.isLoading.set(true);
  const formData = new FormData();
  Object.entries(this.userForm.getRawValue()).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value as any);
      }
    });

  const request$ = this.isEditMode()
    ? this.usersService.updateUser(this.editId()!, formData)
    : this.usersService.saveUser(formData);

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

  onFileChange(event: Event): void {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files.length > 0) {
    const file = input.files[0];

    // JPG only
    if (file.type !== 'image/jpeg') {
      this.showToast('error', 'Only JPG images allowed');
      input.value = '';
      return;
    }

    this.selectedFile = file;

    // store file in form
    this.userForm.patchValue({ image: file });

    // 👇 instant frontend preview
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
}
