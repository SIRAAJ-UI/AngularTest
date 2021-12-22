import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Department, ObjectIds } from '../client/model';
import { MuseumService } from '../museum.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.sass']
})
export class DepartmentComponent implements OnInit {


  public Department:any;
  public ObjectIds:any;
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
          this.ObjectIds = <ObjectIds> data.body;
          // const { departments } = data.body;
          // this.DepartmentList = departments.splice(0, 3);
        }
      }, error => {
        if (error.error instanceof ErrorEvent) {
        }
      })
  }

}
