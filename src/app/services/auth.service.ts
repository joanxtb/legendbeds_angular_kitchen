import { inject, Injectable } from '@angular/core';
import { AuthenticatedUser } from '../model/autheticated.user.type';
import { LocalService } from './localstorage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import moment from 'moment';
import Crypto from 'crypto-js';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  localStore = inject(LocalService);
  http = inject(HttpClient);

  keys = ['NameFirst', 'NameLast', 'UserName', 'UserImage', 'DateBirth', 'Name', 'Image', 'ImageUrl',
    'PhoneNumber_Format', 'PhoneNumber', 'CarrierName', 'EmailAddress', 'Line1', 'City', 'FullPhoneNumber',
    'State', 'Country', 'Address', 'TeamName', 'UserImageUrl', 'FamilyLastName', 'Organizer_EmailAddress',
    'Organizer_Name', 'Confirmation', 'GatewayName', 'DocumentNumber', 'number', 'name', 'cvv', 'expDate', 'expdate', 'zip',
    'FirstName', 'LastName'];

  authUser(): Observable<AuthenticatedUser> {
    return of(JSON.parse(this.localStore.getData('legendbeds.user') || JSON.stringify({ isLoggedIn: false })));
  }

  isLoggedIn(): Observable<boolean> {
    let user: AuthenticatedUser = JSON.parse(this.localStore.getData('legendbeds.user') || JSON.stringify({ isLoggedIn: false }));
    if (user && user.token) {
      return of(true);
    } else {
      return of(false);
    }
  }

  // TODO: probably I need to map the response of this service to a model, 
  // and declare that this return object of that type
  login(email: string, pass: string) {
    const url = `${environment.apiUrl}/api/v4/membership/login`;
    return this.http.post<any>(url, { email, pass });
  }

  persist(user: AuthenticatedUser) {
    this.localStore.saveData('legendbeds.user', JSON.stringify(user));
  }

  humanize(human: any) {
    let offset = parseInt(moment().utc().format('D'));
    this.keys.forEach(k => {
      try { human[k] = Crypto.TripleDES.decrypt(human[k], `secret-${offset}-secret`).toString(Crypto.enc.Utf8); }
      catch (e) { }
    });
  }
}
