import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  // isMenuOpen = false;

  // toggleMenu() {
  //   this.isMenuOpen = !this.isMenuOpen;
  // }

  // closeMenu() {
  //   this.isMenuOpen = false;
  // }

isMenuOpen = false;

  isLoggedIn = false;
  userName: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.authService.loggedIn$.subscribe(val => this.isLoggedIn = val);
  this.authService.userName$.subscribe(name => this.userName = name);
}


  loadUserData() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userName = this.authService.getName();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  onLogout() {
  this.authService.logout();
  this.router.navigateByUrl('/auth/login');
}



}
