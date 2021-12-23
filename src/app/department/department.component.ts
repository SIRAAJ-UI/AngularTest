import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, HostListener, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Department, ObjectDetails, ObjectIds } from '../client/model';
import { IObjectDetails } from '../interfaces/model.interfaces';
import { MuseumService } from '../museum.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

const PAGE_SIZE = 6;

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  @ViewChild("ImageView") ImageView: TemplateRef<ElementRef>;

  public Department: any;
  public ObjectIds: any;
  public skipRows: number = 0;
  public takeRows: number = 6;
  public TotalPageSize: number;
  public page = 1;
  public Details: Array<IObjectDetails>;
  public loading: boolean = false;
  public modalRef: BsModalRef;
  public previewDetails: IObjectDetails;
  @HostListener('mouseover') onHover() {
    this.IsNavButtonVisible = false;
  }
  @HostListener('mouseout') onHout() {
    this.IsNavButtonVisible = true;
  }
  public IsNavButtonVisible: boolean = false;
  public imageHolder: Array<number> = [1, 2, 3, 4, 5, 6]
  // @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent: ElementRef<any>;

  @Input("Department") set __department(value: Department) {
    if (value) {
      this.Department = value;
      this.SearchByDepartmentId();
    }

  }
  constructor(private museumService: MuseumService, private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  SearchByDepartmentId() {
    this.loading = true;
    const { departmentId, displayName } = this.Department;
    const departmentById: Observable<HttpEvent<any>> = this.museumService.GetDepartmentById(displayName, departmentId);
    departmentById
      .subscribe(data => {
        if (data.type === HttpEventType.DownloadProgress) {
        } else if (data.type === HttpEventType.Response) {
          const __objectIds = <ObjectIds>data.body;
          this.TotalPageSize = __objectIds.total;
          this.museumService.StoreObjectIdsDictonary(departmentId, __objectIds.objectIDs)
          this.ObjectIds = __objectIds.objectIDs.slice(this.skipRows, this.takeRows);
          this.forkJoinRequest()
        }
      }, error => {
        if (error.error instanceof ErrorEvent) {
        }
      })
  }

  openImageWindow(record: IObjectDetails) {
    this.previewDetails = record;
    if (this.modalRef) {
      this.modalRef.hide();
    }
    this.modalRef = this.modalService.show(this.ImageView, {
      backdrop: 'static',
      keyboard: false,
      class: 'gray modal-lg'
    });
  }
  onNextRecord() {
    if (this.page < this.TotalPageSize) {
      this.page += 1;
    }
    this.loading = true;
    this.onPageRequest();
  }
  onPrevRecord() {
    if (this.page > 1) {
      this.page -= 1;
    }
    this.loading = true;
    this.onPageRequest();
  }
  private onPageRequest() {
    this.skipRows = this.page * PAGE_SIZE;
    this.takeRows = PAGE_SIZE;
    const { departmentId } = this.Department;
    this.ObjectIds = this.museumService.GetObjectIdsDepartment(departmentId, this.skipRows, this.takeRows);
    this.forkJoinRequest()
  }

  private forkJoinRequest() {
    const arrayRequest = [];
    this.ObjectIds.forEach((objectId: number, index) => {
      arrayRequest.push(this.museumService.GetObjectDetails(objectId))
    });
    this.Details = [];
    forkJoin(arrayRequest).subscribe(response => {
      response.forEach((object: any) => {
        const { artistAlphaSort, artistDisplayName, artistPrefix, artistDisplayBio, primaryImage, primaryImageSmall, title, objectName, objectDate, city, culture } = object.body;
        const objectDetails: IObjectDetails = new ObjectDetails(title, objectName, artistAlphaSort, artistDisplayName, artistPrefix, artistDisplayBio, primaryImage, primaryImageSmall, objectDate, city, culture);
        this.Details.push(objectDetails);
        this.loading = false;
      });
    })
  }
 
}
