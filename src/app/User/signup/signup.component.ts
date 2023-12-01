import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'src/app/Models/User.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: User = {
    id: 0,
    username: '',
    password: '',
    email: '',
    mobile_no: 0,
    dob: new Date()
  };

  constructor(private userService: UserService) {}

  onSignUp(): void {
    this.userService.signUp(this.user).subscribe(
      response => {
        // Handle response
      },
      error => {
        // Handle error
      }
    );
  }
  // Other methods...
}
