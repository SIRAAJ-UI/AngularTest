import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from './client/model';
import { AccountAPIUrls } from './global.urls';

@Injectable({
  providedIn: 'root'
})
export class MuseumService {

  public ObjectsIds:Array<Array<number>> = [];
  constructor(private httpClient: HttpClient) {
  }
  GetAllDepartments(): Observable<HttpEvent<Array<Department>>> {
    const getRequest: HttpRequest<any> = new HttpRequest('GET', AccountAPIUrls.GetAllDepartments);
    return this.httpClient.request(getRequest);
  }
  GetDepartmentById(query:string,departmentId:number): Observable<HttpEvent<Array<Department>>> {
    const getRequest: HttpRequest<any> = new HttpRequest('GET', `${AccountAPIUrls.GetDepartmentById}?q=${query}&departmentId=${departmentId}&hasImages=true`);
    return this.httpClient.request(getRequest);
  }
  StoreObjectIdsDictonary(departmentId:number,objectList:Array<number>){
    this.ObjectsIds[departmentId] = objectList;
  }
  GetObjectIdsDepartment(departmentId:number,skipRows:number,takeRows:number){
    return [...this.ObjectsIds[departmentId]].splice(skipRows,takeRows);
  }
  GetObjectDetails(objectId: number){
    // https://collectionapi.metmuseum.org/public/collection/v1/objects/310537
    const getRequest: HttpRequest<any> = new HttpRequest('GET', `${AccountAPIUrls.GetObjectDetails}/${objectId}`);
    return this.httpClient.request(getRequest);
  }
}
