import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';

@Component({
  selector: 'app-dashboard',
  imports: [AdminLayoutComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  userDetail:any
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.userDetail = JSON.parse(localStorage.getItem('userDetails') || '{}')[0];
  }

  // menuItems = [
  //   {
  //     name: 'Dashboard',
  //     link: '#',
  //     children: [],
  //   },
  //   {
  //     name: 'Settings',
  //     link: '#',
  //     children: [
  //       { name: 'General', link: '#' },
  //       { name: 'Security', link: '#' },
  //       {
  //         name: 'Advanced',
  //         link: '#',
  //         children: [
  //           { name: 'Logs', link: '#' },
  //           { name: 'API Keys', link: '#' },
  //         ],
  //       },
  //     ],
  //   },
  //   { name: 'Reports', link: '#', children: [] },
  // ];

  logout(): void {
    this.authService.logout();
  }
}
