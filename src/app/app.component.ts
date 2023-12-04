import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'InventoryAngular';
  isLoggedIn: boolean = false; // Simulated login status

  constructor(private router: Router) {
      // Check if the user is logged in (you might want to use authentication service here)
      // For demonstration, let's simulate that the user is logged in
      this.isLoggedIn = true;
  }

  logout(): void {
      // Perform logout actions (e.g., clearing session, removing tokens, etc.)
      // For demonstration, let's simulate logging out by navigating to the login page
      this.router.navigate(['/login']);
  }
}
