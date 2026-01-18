import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { BehaviorSubject, tap } from 'rxjs';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  message: string;
  role: string;
  token: string;
  name: string;
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
  private nameKey = "malvani_username";

  // ✅ This is required for navbar update
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  loggedIn$ = this.loggedInSubject.asObservable();

  private userNameSubject = new BehaviorSubject<string | null>(this.getName());
  userName$ = this.userNameSubject.asObservable();

  constructor(private api: ApiService) {}

  login(payload: LoginPayload) {
    return this.api.post<{ message: string; result: LoginResponse }>(
      '/auth/login',
      payload
    ).pipe(
      tap((res) => {
        localStorage.setItem(this.tokenKey, res.result.token);
        localStorage.setItem(this.roleKey, res.result.role);
        localStorage.setItem(this.emailKey, res.result.email);
        localStorage.setItem(this.nameKey, res.result.name);

        // ✅ update navbar instantly
        this.loggedInSubject.next(true);
        this.userNameSubject.next(res.result.name);
      })
    );
  }

  register(payload: RegisterPayload) {
    return this.api.post('/auth/register', payload);
  }

  // -------------------
  // getters
  // -------------------
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getName(): string | null {
    return localStorage.getItem(this.nameKey);
  }

  hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.emailKey);
    localStorage.removeItem(this.nameKey);

    // ✅ update navbar instantly
    this.loggedInSubject.next(false);
    this.userNameSubject.next(null);
  }
}
