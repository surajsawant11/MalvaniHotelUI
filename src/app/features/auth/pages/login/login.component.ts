import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  showPassword = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
  private fb: FormBuilder,
  private authService: AuthService,
  private router: Router
) {}


  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  submit() {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  this.authService.login(this.loginForm.value as any).subscribe({
    next: () => {
      alert('Login Success ✅');
      this.router.navigateByUrl('/');
    },
    error: (err) => {
      console.error(err);
      alert('Login Failed ❌');
    },
  });
}

}
