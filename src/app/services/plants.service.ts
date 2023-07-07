import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/config';
import { IPlant } from '../models/Iplant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantsService {

  constructor(private http: HttpClient, private authService : AuthService) {

  }

  getPlants() : Observable<IPlant[]> {
    return this.http.get<IPlant[]>(`${config.baseUrl}/plants?userId=${this.authService.getUserId()}`);
  }

  getPlantById(id: number) : Observable<IPlant> {
    return this.http.get<IPlant>(`${config.baseUrl}/plants/${id}?userId=${this.authService.getUserId()}`);
  }
}
