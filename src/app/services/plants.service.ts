import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/config';
import { IPlant, IPlantPost } from '../models/Iplant';
import { Observable, forkJoin, throwError } from 'rxjs';
import { map, concatMap, catchError } from 'rxjs/operators';
import { PlantsSheetsService } from './plants-sheets.service';
import { IPlantSheet } from '../models/IPlantSheet';
import { IResponse, IResponseArray } from '../models/IReponse';
import { IJournalEntry } from '../models/IJournalEntry';

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
    const plants$ : Observable<IResponseArray> = this.http.get<IResponseArray>(`${config.baseApiUrl}/items/plants`);
    return plants$.pipe(
      // adding sheets
      concatMap((plantsResponse: IResponseArray) => {
        const plants: IPlant[] = plantsResponse.data
        const sheetRequests = plants.map((plant: any) =>
          this.http.get<IResponse>(`${config.baseApiUrl}/items/sheets/${plant.sheetId}`)
        );
        return forkJoin(sheetRequests).pipe(
          // map((response, i) => response[i].data),
          map((sheet: IResponse[]) => {
            return plants.map((plant: IPlant, index: number) => {
              return { ...plant, sheet: sheet[index].data };
            });
          })
        );
      }),
      // aadding Journal
      concatMap((plants: IPlant[]) => {
        const journalRequests = plants.map((plant: any) =>
          this.http.get<IResponseArray[]>(`${config.baseApiUrl}/items/journalEntries?filter[plantId][_eq]=${plant.id}&sort[]=-timestamp&filter[type][_eq]=watering&limit=1`)
        );
        return forkJoin(journalRequests).pipe(
          // map((response, i) => response[i].data),
          map((journal: any[]) => {
            return plants.map((plant: IPlant, index: number) => {
              return { ...plant, lastJournal: journal[index].data[0] };
            });
          })
        );
      }),
      catchError(error => {
        return throwError(() => 'Ocurrió un error al obtener las plantas.');
      }),
    )
  }

  addPlant(body: IPlantPost) : Observable<IPlantPost> {
    return this.http.post<IPlantPost>(`${config.baseApiUrl}/items/plants`, body)
      .pipe(
        catchError(error => {
          return throwError(() => 'Ocurrió un error al añadir la planta.');
        }),
      );
  }

  editPlant(id: number, body: IPlantPost) : Observable<IPlantPost> {
    return this.http.patch<IPlantPost>(`${config.baseApiUrl}/items/plants/${id}`, body)
      .pipe(
        catchError(error => {
          return throwError(() => 'Ocurrió un error al obtener modificar la planta.');
        }),
      );
  }

  getPlantById(id: number) : Observable<IPlant> {
    return this.http.get<IResponse>(`${config.baseApiUrl}/items/plants/${id}`)
      .pipe(
        map(response => response.data),
        catchError(error => {
          return throwError(() => 'Ocurrió un error al obtener la información de la planta.');
        }),
      );
  }

  deletePlant(id: number) : Observable<IPlant> {
    return this.http.delete<IPlant>(`${config.baseApiUrl}/items/plants/${id}`)
      .pipe(
        catchError(error => {
          return throwError(() => 'Ocurrió un error al borrar la planta.');
        }),
      );
  }
}
