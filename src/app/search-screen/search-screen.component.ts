import { Component, OnInit, Input } from '@angular/core';
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
  originalSheets!: IPlantSheet[];
  filterString: string;
  @Input() embedded: boolean = false;


  constructor(
    private plantSheetsService: PlantsSheetsService,
    private loaderService: LoaderService,
    private _snackBar: MatSnackBar
  ) {
    this.filterString = '';

  }

  ngOnInit() {
    this.loaderService.setVisibility(true);
    this.plantSheetsService.getAll()
      .subscribe({
        next: result => {
          this.loaderService.setVisibility(false);
          this.sheets = result;
          this.originalSheets = [...result];
        },
        error: (e: string) => {
          this.loaderService.setVisibility(false);
          this._snackBar.open(e, "OK", { duration: 3000 });
        }
      });
  }

  clear() {
    this.filterString = '';
    this.sheets = [...this.originalSheets];
  }

  onChangeFilter(e: Event) {
    this.sheets = this.originalSheets.filter(s => {
      if (
        s.name.toLowerCase().includes((e.target as HTMLInputElement)?.value.toLowerCase())
          || s.otherNames.toLowerCase().includes((e.target as HTMLInputElement)?.value.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
  }

}
