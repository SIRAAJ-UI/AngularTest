import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Department } from './client/model';
import { AccountAPIUrls } from './global.urls';

@Injectable({
  providedIn: 'root'
})
export class MuseumService {

  public ObjectsIds:Array<Array<number>> = [];
  private __SearchQuery: Subject<string>;
  constructor(private httpClient: HttpClient) {
    this.__SearchQuery = new Subject();
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
    console.log(this.ObjectsIds[departmentId])
    return [...this.ObjectsIds[departmentId]].splice(skipRows,takeRows);
  }
  GetObjectDetails(objectId: number){
    const getRequest: HttpRequest<any> = new HttpRequest('GET', `${AccountAPIUrls.GetObjectDetails}/${objectId}`);
    return this.httpClient.request(getRequest);
  }

  

  SearchQuery(query: string){
    this.__SearchQuery.next(query);
  }
  get QuerySearch():Observable<string> {
    return this.__SearchQuery.asObservable();
  }
}
