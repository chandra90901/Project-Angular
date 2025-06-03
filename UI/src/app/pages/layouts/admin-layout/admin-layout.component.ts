import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit{
  isOpen = false;
  isSettingsMenuOpen = false;
  isDropdownOpen = false; // Dropdown state
  username = 'Username'; // Replace with actual username from auth service
  profileImage = 'https://via.placeholder.com/40'; // Replace with dynamic profile image
  userDetail:any
  constructor(private authService: AuthService, private router: Router) {
    // Restore menu state on reload
    const storedState = localStorage.getItem('menuOpen');
    this.isOpen = storedState === 'true';

    // Preserve menu state on navigation
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isOpen = localStorage.getItem('menuOpen') === 'true';
      }
    });
  }
  ngOnInit(): void {
    this.userDetail = JSON.parse(localStorage.getItem('userDetails') || '{}')[0];
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    localStorage.setItem('menuOpen', this.isOpen.toString());
  }

  toggleSettingsMenu() {
    this.isSettingsMenuOpen = !this.isSettingsMenuOpen;
  }

  toggleDropdown(event: Event) {
    event.preventDefault(); // Prevent default navigation behavior
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    this.authService.logout();
    localStorage.removeItem('menuOpen');
    this.isDropdownOpen = false;
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.isDropdownOpen = false;
    }
  }
}
