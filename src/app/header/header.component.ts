import { Component, Input } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() showBackBtn: boolean;
  @Input() text!: string;
  @Input() subtext!: string;
  @Input() backgroundImageURL!: string | undefined;
  @Input() imageAsIcon!: string | undefined;

  constructor(private _location: Location) {
    this.showBackBtn = false;

  }

  goBack() {
    this._location.back();
  }
}
