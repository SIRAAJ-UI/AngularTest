import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../interfaces/model.interfaces';
import { MuseumService } from '../museum.service';

@Component({
  selector: 'app-museum-gallery',
  templateUrl: './museum-gallery.component.html',
  styleUrls: ['./museum-gallery.component.scss']
})
export class MuseumGalleryComponent implements OnInit {

  public DepartmentList: Array<Department> = [];
  constructor(private museumService: MuseumService) { }

  ngOnInit(): void {

    const departments: Observable<HttpEvent<any>> = this.museumService.GetAllDepartments();
    departments
      .subscribe(data => {
        if (data.type === HttpEventType.DownloadProgress) {
        } else if (data.type === HttpEventType.Response) {
          const { departments } = data.body;
          // this.DepartmentList = departments.splice(0, 1);
          this.DepartmentList = departments;

        }
      }, error => {
        if (error.error instanceof ErrorEvent) {
        }
      })
  }

  SearchInput($event) {
    this.museumService.SearchQuery($event.value);
  }

}
