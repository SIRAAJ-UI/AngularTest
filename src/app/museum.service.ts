import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from './client/model';
import { AccountAPIUrls } from './global.urls';

@Injectable({
  providedIn: 'root'
})
export class MuseumService {

  constructor(private httpClient: HttpClient) {
  }

  GetAllDepartments(): Observable<HttpEvent<Array<Department>>> {
    const getRequest: HttpRequest<any> = new HttpRequest('GET', AccountAPIUrls.GetAllDepartments);
    return this.httpClient.request(getRequest);
  }
}
