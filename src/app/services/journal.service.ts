import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/config';
import { IJournalEntry, IJournalEntryPost } from '../models/IJournalEntry';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor(private http: HttpClient, private authService : AuthService) {

  }

  getJournalEntries(plantId: number) : Observable<IJournalEntry[]> {
    return this.http.get<IJournalEntry[]>(`${config.baseUrl}/journalEntries?plantId=${plantId}&userId=${this.authService.getUserId()}`);
  }

  addJournalEntry(body: IJournalEntryPost) : Observable<IJournalEntry> {
    return this.http.post<IJournalEntry>(`${config.baseUrl}/journalEntries`, body);
  }
}
