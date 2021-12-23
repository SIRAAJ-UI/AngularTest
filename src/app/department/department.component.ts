import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Department, ObjectDetails, ObjectIds } from '../client/model';
import { IObjectDetails } from '../interfaces/model.interfaces';
import { MuseumService } from '../museum.service';
const PAGE_SIZE = 6;

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  public Department:any;
  public ObjectIds:any;
  public skipRows: number = 0;
  public takeRows: number = 6;
  public TotalPageSize: number;
  public page = 1;
  public Details:Array<IObjectDetails>;
  // @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent: ElementRef<any>;

  @Input("Department") set __department(value:Department){
    if(value){
      this.Department = value;
      this.SearchByDepartmentId();
    }
  
  }
  constructor(private museumService: MuseumService) { }

  ngOnInit(): void {
  }

  SearchByDepartmentId() {
    const { departmentId,displayName } = this.Department;
    const departmentById: Observable<HttpEvent<any>> = this.museumService.GetDepartmentById(displayName,departmentId);
    departmentById
      .subscribe(data => {
        if (data.type === HttpEventType.DownloadProgress) {
        } else if (data.type === HttpEventType.Response) {
          const __objectIds = <ObjectIds> data.body;
          this.TotalPageSize = __objectIds.total;
          this.museumService.StoreObjectIdsDictonary(departmentId,__objectIds.objectIDs)
          this.ObjectIds = __objectIds.objectIDs.slice(0,6);
          console.log(this.ObjectIds)
        }
      }, error => {
        if (error.error instanceof ErrorEvent) {
        }
      })
  }

  onNextRecord(){ 
    if(this.page < this.TotalPageSize){
      this.page += 1;
    }
    this.skipRows = this.page * PAGE_SIZE;
    this.takeRows = PAGE_SIZE;
    const { departmentId } = this.Department;
    this.ObjectIds = this.museumService.GetObjectIdsDepartment(departmentId,this.skipRows,this.takeRows);
    this.forkJoinRequest()
  }

  private forkJoinRequest(){
    const arrayRequest = [];
    this.ObjectIds.forEach((objectId:number, index) => {
      arrayRequest.push(this.museumService.GetObjectDetails(objectId))
    });
    this.Details = [];
    forkJoin(arrayRequest).subscribe(response => {
      response.forEach( (object:any) => {
        const { artistAlphaSort,artistDisplayName,artistPrefix,artistDisplayBio,primaryImage,primaryImageSmall,title,objectName } = object.body;
        const objectDetails:IObjectDetails = new ObjectDetails(title,objectName,artistAlphaSort,artistDisplayName,artistPrefix,artistDisplayBio,primaryImage,primaryImageSmall);
        this.Details.push(objectDetails);
      });
    })
  }
  onPrevRecord() { 
    if(this.page > 1){
      this.page -= 1;
    }
    this.skipRows = this.page * PAGE_SIZE;
    this.takeRows = PAGE_SIZE;
    const { departmentId } = this.Department;
    this.ObjectIds = this.museumService.GetObjectIdsDepartment(departmentId,this.skipRows,this.takeRows);
    this.forkJoinRequest()
  }
}
