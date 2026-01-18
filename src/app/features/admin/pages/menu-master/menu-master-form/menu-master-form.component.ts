import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MenuMasterService } from '../services/menu-master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-master-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf,RouterLink],
  templateUrl: './menu-master-form.component.html',
  styleUrl: './menu-master-form.component.css'
})
export class MenuMasterFormComponent implements OnInit {
  private editId :any;
  private editFlag:boolean = false;

  constructor(private fb : FormBuilder, private menuService : MenuMasterService, private activatedRoute : ActivatedRoute){}

  ngOnInit(): void {
    this.editId = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.editId){
      this.editFlag = true;
      this.menuService.findById(this.editId).subscribe({
        next :(res)=>{
          this.menuForm.patchValue({
          menuId: res?.menuId,
          name: res?.name,
          category: res?.category,
          description: res?.description,
          price: res?.price,
          status: res?.status
        });
        },
        error : (e)=>{
          this.showToast('error', e?.message || 'Something went wrong');
        }
      })

    }
  }
  menuForm = this.fb.group({
  menuId :[null],
  name: ['', Validators.required],
  category: ['', Validators.required],
  description: [''],
  price: [null, Validators.required],
  status :['ACTIVE',Validators.required]
});
submit(){
  const payload = this.menuForm.getRawValue();
  this.menuService.saveMenu(payload as any).subscribe({
    next : (res : any) =>{
      this.showToast('success', res?.message || 'Menu Added Successful');
    },
    error : (e)=>{
      this.showToast('error', e?.message || 'Something went wrong');
    }
  });
}

private showToast(icon: 'success' | 'error', title: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon,
      title,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }

}
