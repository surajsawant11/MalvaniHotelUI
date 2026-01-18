import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService, RegisterPayload } from '../../services/auth.service';
import Swal from 'sweetalert2';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!password || !confirmPassword) return null;
  return password === confirmPassword ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  showPassword = false;
  showConfirmPassword = false;

  registerForm = this.fb.group(
    {
      name: ['suraj', [Validators.required, Validators.minLength(3)]],
      phone: ['1234567890', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['s@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['123456', [Validators.required]],
    },
    { validators: passwordMatchValidator }
  );

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  submit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    // console.log('Register Data:', this.registerForm.value);
    // alert('Registration successful ✅ (connect API later)');
    this.authService.register(this.registerForm.value as RegisterPayload).subscribe({
  next: (res: any) => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: res?.message || 'User Added Successfully',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  },
  error: (e) => {

    const msg =
      e?.error?.message ||
      e?.error ||
      'Something went wrong';

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: msg,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  }
});


    // this.registerForm.reset();
  }
}
