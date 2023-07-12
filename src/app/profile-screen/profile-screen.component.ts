import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IUser } from '../models/IUser';

@Component({
  selector: 'app-profile-screen',
  templateUrl: './profile-screen.component.html',
  styleUrls: ['./profile-screen.component.scss']
})
export class ProfileScreenComponent {
  user: IUser;
  constructor(private authService: AuthService) {
    this.user = authService.getUser();
  }

  logout() {
    this.authService.logout();
  }
}
