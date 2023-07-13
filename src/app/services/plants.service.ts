import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/config';
import { IPlant, IPlantPost } from '../models/Iplant';
import { Observable, forkJoin } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { PlantsSheetsService } from './plants-sheets.service';
import { IPlantSheet } from '../models/IPlantSheet';

@Injectable({
  providedIn: 'root'
})
export class PlantsService {

  constructor(
    private http: HttpClient,
    private authService : AuthService,
    private sheetService: PlantsSheetsService,
  ) {

  }


  getPlants() : Observable<any> {
    const plants$ : Observable<IPlant[]> = this.http.get<IPlant[]>(`${config.baseUrl}/plants?userId=${this.authService.getUserId()}`);
    return plants$.pipe(
      concatMap((plants: IPlant[]) => {
        const sheetRequests = plants.map((plant: any) =>
          this.http.get<IPlantSheet[]>(`${config.baseUrl}/sheets/${plant.sheetId}?userId=${this.authService.getUserId()}`)
        );
        return forkJoin(sheetRequests).pipe(
          map((sheets: any[]) => {
            return plants.map((plant: IPlant, index: number) => {
              return { ...plant, sheet: sheets[index] };
            });
          })
        );
      }),
      concatMap((plants: IPlant[]) => {
        const journalRequests = plants.map((plant: any) =>
          this.http.get<IPlantSheet[]>(`${config.baseUrl}/journalEntries?plantId=${plant.id}&userId=${this.authService.getUserId()}&sort=timestamp&order=desc&type=watering&_limit=1`)
        );
        return forkJoin(journalRequests).pipe(
          map((journal: any[]) => {
            return plants.map((plant: IPlant, index: number) => {
              return { ...plant, lastJournal: journal[index]?.[0] };
            });
          })
        );
      })
    )
  }

  addPlant(body: IPlantPost) : Observable<IPlantPost> {
    return this.http.post<IPlantPost>(`${config.baseUrl}/plants?userId=${this.authService.getUserId()}`, body);
  }

  editPlant(id: number, body: IPlantPost) : Observable<IPlantPost> {
    return this.http.put<IPlantPost>(`${config.baseUrl}/plants/${id}?userId=${this.authService.getUserId()}`, body);
  }

  getPlantById(id: number) : Observable<IPlant> {
    return this.http.get<IPlant>(`${config.baseUrl}/plants/${id}?userId=${this.authService.getUserId()}`);
  }

  deletePlant(id: number) : Observable<IPlant> {
    return this.http.delete<IPlant>(`${config.baseUrl}/plants/${id}?userId=${this.authService.getUserId()}`);
  }
}
