import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl = environment.apiUrl;
  
  private isAuthenticated = false;

  constructor(private router: Router, private httpClient: HttpClient) {}

  // Simulate login
  login(username: string, password: string) {
    return this.httpClient.post(`${this.baseUrl}/user/checkUser`,{Username:username,Password:password});
    
    // if (email === 'admin@admin.com' && password === 'password') {
    //   this.isAuthenticated = true;
    //   localStorage.setItem('authToken', 'your-token'); // Simulate a JWT
    //   return true;
    // }
    // return false;
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.isAuthenticated || !!localStorage.getItem('authToken');
  }

  // Simulate logout
  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('authToken');
    localStorage.removeItem('userDetails');
    this.router.navigate(['/login']);
  }
}
