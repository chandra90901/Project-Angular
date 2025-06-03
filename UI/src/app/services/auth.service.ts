import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router, private httpClient: HttpClient) {}

  // Simulate login
  login(username: string, password: string) {
    console.log(username)
    return this.httpClient.post("http://localhost:3000/api/check-user",{Username:username,Password:password});
    
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
