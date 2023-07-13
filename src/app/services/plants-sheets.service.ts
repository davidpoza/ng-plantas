import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/config';
import { IPlantSheet } from '../models/IPlantSheet';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantsSheetsService {

  constructor(private http: HttpClient, private authService : AuthService) {

  }

  getPlantSheetById(id: number) : Observable<IPlantSheet> {
    return this.http.get<IPlantSheet>(`${config.baseUrl}/sheets/${id}?userId=${this.authService.getUserId()}`)
      .pipe(
        catchError(error => {
          return throwError(() => 'Ocurrió un error al obtener la información adicional del tipo de planta.');
        }),
      );
  }

  getAll() : Observable<IPlantSheet[]> {
    return this.http.get<IPlantSheet[]>(`${config.baseUrl}/sheets?_sort=name&_order=asc`)
      .pipe(
        catchError(error => {
          return throwError(() => 'Ocurrió un error al obtener el listado de clases de plantas.');
        }),
      );
  }

}
