import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { tap } from 'rxjs';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  message: string;
  role: string;
  token: string;
}
export interface RegisterPayload {
  name: string;
  phone: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'malvani_token';
  private roleKey = "malvani_role";
  private emailKey = "malvani_email";

  
  constructor(private api : ApiService) { }

  login(payload: LoginPayload) {
    return this.api.post<{result : LoginResponse}>('/auth/login',payload).pipe(
      tap((res)=>{
        localStorage.setItem(this.tokenKey, res.result.token)
        localStorage.setItem(this.roleKey, res.result.role)
        localStorage.setItem(this.emailKey, res.result.email)
      })
    )
        
      
  };

  register(payload: RegisterPayload) {
    return this.api.post('/auth/register', payload);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }


}
