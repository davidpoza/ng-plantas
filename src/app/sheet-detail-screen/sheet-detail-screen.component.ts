import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PlantsSheetsService } from '../services/plants-sheets.service';
import { LoaderService } from '../services/loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IPlantSheet } from '../models/IPlantSheet';

@Component({
  selector: 'app-sheet-detail-screen',
  templateUrl: './sheet-detail-screen.component.html',
  styleUrls: ['./sheet-detail-screen.component.scss']
})
export class SheetDetailScreenComponent implements OnInit {
  @Input() id!: boolean;
  sheet!: IPlantSheet

  constructor(
    private route: ActivatedRoute,
    private sheetsService: PlantsSheetsService,
    private loaderService: LoaderService,
    private _snackBar: MatSnackBar
  ) {

  }

  ngOnInit() {
    let id;
    this.route.params.subscribe(
      (params: Params) => {
        id = params['id'];
      }
    )

    if (id) {
      this.sheetsService.getPlantSheetById(id)
        .subscribe({
          next: sheet => {
            this.sheet = sheet;
          },
          error: (e: string) => {
            this.loaderService.setVisibility(false);
            this._snackBar.open(e, "OK", { duration: 3000 });
          }
        });
    }
  }
}
