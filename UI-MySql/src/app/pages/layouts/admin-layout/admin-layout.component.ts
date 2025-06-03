import { Component, HostListener, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppSettingService } from '../../../services/app-setting.service';
@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  @Input() pageHeader = ''
  isOpen = false;
  isSettingsMenuOpen = false;
  isNotificationsMenuOpen = false;
  isDropdownOpen = false;
  username = 'Username';
  profileImage = 'https://via.placeholder.com/40';
  userDetail: any
  settings: any;
  @ViewChild('logoutModal') logoutModal!: TemplateRef<any>;
  constructor(private authService: AuthService, private router: Router, private modalService: NgbModal,
    private appSettingService: AppSettingService
  ) {
    const storedState = localStorage.getItem('menuOpen');
    this.isOpen = storedState === 'true';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isOpen = localStorage.getItem('menuOpen') === 'true';
      }
    });
  }
  ngOnInit(): void {
    this.getAppSettings();
    this.userDetail = JSON.parse(localStorage.getItem('userDetails') || '{}');
  }
  getAppSettings() {
    this.appSettingService.getAllSettings().subscribe(
      x => {
        this.settings = x;
      }
    )
  }
  getSetting(property: string): string {
    if (!Array.isArray(this.settings)) {
      return '';
    }
    const match = this.settings.find((x: any) => x.Property === property);
    return match ? match.Value : '';

  }
  toggleMenu() {
    this.isOpen = !this.isOpen;
    localStorage.setItem('menuOpen', this.isOpen.toString());
  }
  toggleSettingsMenu() {
    this.isSettingsMenuOpen = !this.isSettingsMenuOpen;
  }
  toggleNotificationsMenu() {
    this.isNotificationsMenuOpen = !this.isNotificationsMenuOpen;
  }
  toggleDropdown(event: Event) {
    event.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  openLogoutModal(modalContent: TemplateRef<any>): void {
    this.modalService.open(modalContent, { backdrop: 'static', centered: true });
  }
  confirmLogout(modal: any): void {
    modal.close();
    this.authService.logout();
    localStorage.removeItem('menuOpen');
  }
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isOpen) return;

    const sidebarElement = document.querySelector('.slide-menu');
    if (sidebarElement) {
      const rect = sidebarElement.getBoundingClientRect();
      const isInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!isInside) {
        this.isOpen = false;
        localStorage.setItem('menuOpen', 'false');
      }
    }
  }
  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
