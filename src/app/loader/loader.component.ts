import { Component } from '@angular/core';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  visible: boolean;
  constructor(private _loaderService: LoaderService) {
    this.visible = false;
    this._loaderService.getVisibility()
      .subscribe(value => {
        this.visible = value;
      })
  }


}
