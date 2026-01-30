import { NgIf } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { MenuMasterService } from '../services/menu-master.service';

@Component({
  selector: 'app-menu-master-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './menu-master-form.component.html',
  styleUrl: './menu-master-form.component.css'
})
export class MenuMasterFormComponent implements OnInit {
selectedFile!: File | null;

  // ✅ Signals
  editId = signal<number | null>(null);
  isEditMode = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private menuService: MenuMasterService,
    private route: ActivatedRoute
  ) {}

  // ✅ Reactive Form
  menuForm = this.fb.group({
    menuId: [null],
    name: ['', Validators.required],
    category: ['', Validators.required],
    description: [''],
    price: [null, Validators.required],
    status: ['ACTIVE', Validators.required],
     image: [null as File | null]
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      const id = Number(idParam);
      this.editId.set(id);
      this.isEditMode.set(true);
      this.loadMenuById(id);
    }
  }

  private loadMenuById(id: number): void {
    this.isLoading.set(true);

    this.menuService.findById(id).subscribe({
      next: (res: any) => {
        this.menuForm.patchValue({
          menuId: res?.menuId,
          name: res?.name,
          category: res?.category,
          description: res?.description,
          price: res?.price,
          status: res?.status
        });

        this.isLoading.set(false);
      },
      error: (e) => {
        this.isLoading.set(false);
        this.showToast('error', e?.error?.message || 'Failed to load menu data');
      }
    });
  }

  submit(): void {
    if (this.menuForm.invalid) {
      this.menuForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();

Object.entries(this.menuForm.getRawValue()).forEach(([key, value]) => {
  if (value !== null && value !== undefined) {
    formData.append(key, value as any);
  }
});

    this.isLoading.set(true);

    const request$ = this.isEditMode()
      ? this.menuService.updateMenu(this.editId()!, formData)
      : this.menuService.saveMenu(formData );

    request$.subscribe({
      next: (res: any) => {
        this.isLoading.set(false);
        this.showToast(
          'success',
          res?.message || (this.isEditMode() ? 'Menu Updated Successfully' : 'Menu Added Successfully')
        );

        if (!this.isEditMode()) {
          this.resetForm();
        }
      },
      error: (e) => {
        this.isLoading.set(false);
        this.showToast('error', e?.error?.message || 'Something went wrong');
      }
    });
  }

  resetForm(): void {
    this.menuForm.reset({ status: 'ACTIVE' });
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
    this.selectedFile = input.files[0];

    // store file in form
   this.menuForm.patchValue({ image: this.selectedFile });

  }
}
}
