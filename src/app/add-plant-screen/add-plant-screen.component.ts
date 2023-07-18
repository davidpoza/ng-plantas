import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PlantsService } from '../services/plants.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IPlant } from '../models/Iplant';
import {Location} from '@angular/common';
import { IPlantSheet } from '../models/IPlantSheet';
import { LoaderService } from '../services/loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-plant-screen',
  templateUrl: './add-plant-screen.component.html',
  styleUrls: ['./add-plant-screen.component.scss']
})
export class AddPlantScreenComponent {
  plant!: IPlant;
  sheet!: IPlantSheet;
  isEdit: boolean;
  activeRoutePath!: string;
  plantForm! : FormGroup;

  constructor(
    private _location: Location,
    private readonly fb: FormBuilder,
    private authService : AuthService,
    private route: ActivatedRoute,
    private plantsService: PlantsService,
    private router: Router,
    private loaderService: LoaderService,
    private _snackBar: MatSnackBar
  ) {
    this.activeRoutePath = this.router.url;
    this.isEdit = this.activeRoutePath.startsWith('/edit-plant');
    if (this.isEdit) {
      this.plant = <IPlant>this.router.getCurrentNavigation()?.extras.state?.['plant'];
      this.sheet = <IPlantSheet>this.router.getCurrentNavigation()?.extras.state?.['sheet'];
    } else {
      this.sheet = <IPlantSheet>this.router.getCurrentNavigation()?.extras.state?.['sheet'];
    }
    this.plantForm = this.initForm();
  }

  initForm() : FormGroup {
    return this.fb.group({
      name: [
        this.isEdit
          ? this.plant.name
          :this.sheet.name,
        [Validators.required]],
      place: [
        this.isEdit
          ? this.plant.place
          : '',
        [Validators.required]],
    })
  }

  addPlant() {
    if (this.isEdit) {
      this.loaderService.setVisibility(true);
      this.plantsService.editPlant(this.plant.id, {
        name: this.plantForm.get('name')?.value,
        place: this.plantForm.get('place')?.value?.toLowerCase(),
        sheetId: this.sheet?.id,
        userId: this.authService.getUserId(),
      })
        .subscribe({
          next: result => {
            this.loaderService.setVisibility(false);
            this.router.navigate(['/']);
          },
          error: (e: string) => {
            this.loaderService.setVisibility(false);
            this._snackBar.open(e, "OK", { duration: 3000 });
          }
        });
    } else {
      this.loaderService.setVisibility(true);
      this.plantsService.addPlant({
        name: this.plantForm.get('name')?.value,
        place: this.plantForm.get('place')?.value?.toLowerCase(),
        sheetId: this.sheet?.id,
        userId: this.authService.getUserId(),
      })
        .subscribe({
          next: result => {
            this.loaderService.setVisibility(false);
            this.router.navigate(['/']);
          },
          error: (e: string) => {
            this.loaderService.setVisibility(false);
            this._snackBar.open(e, "OK", { duration: 3000 });
          }
        });
    }

  }

  goBack() {
    this._location.back();
  }
}

