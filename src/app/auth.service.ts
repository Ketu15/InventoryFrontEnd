import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) {}

  login(): void {
    // Call API for authentication
    // Upon successful authentication, set the isLoggedInSubject to true
    this.isLoggedInSubject.next(true);
    this.router.navigate(['/dashboard']); // Navigate to the desired route after login
  }

  logout(): void {
    // Clear user authentication status upon logout
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']); // Navigate to login page after logout
  }
}




