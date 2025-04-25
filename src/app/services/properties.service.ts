import { Injectable, inject } from '@angular/core';
import { LocalService } from './localstorage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  http = inject(HttpClient);
  localStore = inject(LocalService);

  // Get all the properties of the authenticated user
  fetch_all() {
    const url = `${environment.apiUrl}/api/v4/properties`;
    return this.http.get<any>(url, { headers: { 'auth_token': this.localStore.getData('legendbeds.authtoken') } });
  }
}
