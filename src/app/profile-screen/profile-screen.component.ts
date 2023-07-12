import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile-screen',
  templateUrl: './profile-screen.component.html',
  styleUrls: ['./profile-screen.component.scss']
})
export class ProfileScreenComponent {
  constructor(private authService: AuthService) {

  }

  logout() {
    this.authService.logout();
  }
}
