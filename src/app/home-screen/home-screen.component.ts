import { Component } from '@angular/core';
import { config } from 'src/config';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent {
  appTitle: string = config.appTitle;
}
