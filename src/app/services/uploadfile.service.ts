import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '../models/IReponse';
import { config } from 'src/config';
import { map } from 'rxjs/operators';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadfileService {

  constructor(private http: HttpClient) { }

  upload(body: FormData) {
    return this.http.post<IResponse>(`${config.baseApiUrl}/files`, body)
    .pipe(
      map(response => response.data),
      catchError(error => {
        return throwError(() => 'Ocurrió un error al subir el fichero.');
      }),
    );
  }

}
