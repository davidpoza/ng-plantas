import { Component, Input, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() showBackBtn: boolean;
  @Input() screenTitle!: string;
  @Input() skinny!: boolean;
  @Input() text!: string;
  @Input() subtext!: string;
  @Input() backgroundImageURL!: string | undefined;
  @Input() imageAsIcon!: string | undefined;
  class: string;

  constructor(private _location: Location) {
    this.showBackBtn = false;
    this.class = '';
  }

  ngOnInit() {
    if (this.backgroundImageURL) {
      this.class = 'headerWithBg';
    }

    if (this.skinny) {
      this.class = 'skinny';
    }
  }

  goBack() {
    this._location.back();
  }
}
