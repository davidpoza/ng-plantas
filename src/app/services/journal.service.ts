import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/config';
import { map } from 'rxjs/operators';
import { Observable, catchError, throwError } from 'rxjs';

import { IPaginationOptions } from 'src/app/utils/types/ipagination-options';
import { IJournalEntry, IJournalEntryPaginatedResult, IJournalEntryPatch, IJournalEntryPost, JournalEntryType } from '../models/IJournalEntry';
import { AuthService } from './auth.service';
import { IResponse, IResponseArray } from '../models/IReponse';
@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor(private http: HttpClient, private authService : AuthService) {

  }

  getJournalEntries(plantId: number, paginationOptions: IPaginationOptions = { page: 0, pageSize: 10 }) : Observable<IJournalEntryPaginatedResult> {
    return this.http.get<IJournalEntryPaginatedResult>(`${config.baseApiUrl}/items/journalEntries?filter[plantId][_eq]=${plantId}&sort[]=-timestamp&limit=${paginationOptions.pageSize}&page=${paginationOptions.page+1}&meta=filter_count`)
      .pipe(
        catchError(error => {
          return throwError(() => 'Ocurrió un error al obtener el diario de la planta.');
        }),
      );
  }

  addJournalEntry(body: IJournalEntryPost) : Observable<IJournalEntry> {
    return this.http.post<IResponse>(`${config.baseApiUrl}/items/journalEntries`, body)
      .pipe(
        map(response => response.data),
        catchError(error => {
          return throwError(() => 'Ocurrió un error al añadir la entrada al diario.');
        }),
      );
  }

  deleteJournalEntry(entryId: number) : Observable<IJournalEntry> {
    return this.http.delete<IJournalEntry>(`${config.baseApiUrl}/items/journalEntries/${entryId}`)
      .pipe(
        catchError(error => {
          return throwError(() => 'Ocurrió un error al borrar la entrada del diario.');
        }),
      );
  }

  editJournalEntry(entryId: number, body: IJournalEntryPatch) {
    return this.http.patch<IResponse>(`${config.baseApiUrl}/items/journalEntries/${entryId}`, body)
      .pipe(
        map((response) => response.data),
        catchError(error => {
          return throwError(() => 'Ocurrió un error al realizar la modificación de la entrada.');
        }),
      );
  }

  getPhotoEntries(plantId: number) : Observable<IJournalEntry[]> {
    return this.http.get<IResponseArray>(`${config.baseApiUrl}/items/journalEntries?filter[plantId][_eq]=${plantId}&filter[type][_eq]=${JournalEntryType.photo}&sort[]=-timestamp`)
      .pipe(
        map((response) => response.data),
        catchError(error => {
          return throwError(() => 'Ocurrió un error al obtener el diario de la planta.');
        }),
      );
  }


}
