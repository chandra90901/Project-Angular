import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
@Component({
  selector: 'app-login',
  imports:[FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  mySubscription: Subscription = new Subscription();
  showForm=true;
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  onSubmit(): void {

   const subs = this.authService.login(this.username, this.password).subscribe(
      (x) => {
        localStorage.setItem('authToken', 'your-token');
        localStorage.setItem('userDetails', JSON.stringify(x));
        this.router.navigate(['/dashboard']).then(success => {
          if (success) {
            console.log('Navigation success');
          } else {
            console.error('Navigation failed');
          }
        });
      },
      (err) => {
        alert('Invalid email or password');
      }
    );
    this.mySubscription.add(subs);
    // this.authService.login(this.username, this.password).subscribe(x=>{
    //   //this.router.navigate(['/dashboard']);
    //   this.router.navigateByUrl('/dashboard');

    // },
    // err=>{
    //   alert('Invalid email or password')
    // })
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe(); 
  }
}