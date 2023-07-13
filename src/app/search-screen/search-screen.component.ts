import { Component, OnInit } from '@angular/core';
import { PlantsSheetsService } from '../services/plants-sheets.service';
import { IPlantSheet } from '../models/IPlantSheet';
import { LoaderService } from '../services/loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.scss']
})
export class SearchScreenComponent implements OnInit {
  sheets!: IPlantSheet[];
  constructor(
    private plantSheetsService: PlantsSheetsService,
    private loaderService: LoaderService,
    private _snackBar: MatSnackBar
  ) {


  }

  ngOnInit() {
    this.loaderService.setVisibility(true);
    this.plantSheetsService.getAll()
      .subscribe({
        next: result => {
          this.loaderService.setVisibility(false);
          this.sheets = result;
        },
        error: (e: string) => {
          this.loaderService.setVisibility(false);
          this._snackBar.open(e, "OK", { duration: 3000 });
        }
      });
  }


}
