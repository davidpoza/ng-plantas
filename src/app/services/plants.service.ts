import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/config';
import { IPlant } from '../models/Iplant';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlantsSheetsService } from './plants-sheets.service';
import { IPlantSheet } from '../models/IPlantSheet';

@Injectable({
  providedIn: 'root'
})
export class PlantsService {

  constructor(
    private http: HttpClient,
    private authService : AuthService,
    private sheetService: PlantsSheetsService
  ) {

  }

  getPlants() : Observable<any> {
    const plants$ : Observable<IPlant[]> = this.http.get<IPlant[]>(`${config.baseUrl}/plants?userId=${this.authService.getUserId()}`);
    return plants$.pipe(
      map((plants: IPlant[]) => {
        const requests = plants.map((plant: any) =>
          this.http.get<IPlantSheet[]>(`${config.baseUrl}/sheets/${plant.id}?userId=${this.authService.getUserId()}`)
        );
        return forkJoin(requests).pipe(
          map((sheets: any[]) => {
            return plants.map((plant: IPlant, index: number) => {
              return { ...plant, sheet: sheets[index] };
            });
          })
        );
      })
    )
  }

  getPlantById(id: number) : Observable<IPlant> {
    return this.http.get<IPlant>(`${config.baseUrl}/plants/${id}?userId=${this.authService.getUserId()}`);
  }
}
