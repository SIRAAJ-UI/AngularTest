import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, HostListener, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
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
  public TotalPageSize: number = 0;
  public page = 1;
  public Details: Array<IObjectDetails>;
  public loading: boolean = false;
  public loading$:Subject<boolean>;
  public modalRef: BsModalRef;
  public previewDetails: IObjectDetails;
  public Subscribes:any[] = [];
  public IsNavButtonVisible: boolean = true;
  public NoDataAvailable: boolean = false;
  public imageHolder: Array<number> = [1, 2, 3, 4, 5, 6]
  @HostListener('mouseover') onHover() {
    if(this.TotalPageSize>6){
      this.IsNavButtonVisible = false;
    } else {
      this.IsNavButtonVisible = true;
    }
  }
  @HostListener('mouseout') onHout() {
    this.IsNavButtonVisible = true;
  }
  @Input("Department") set __department(value: Department) {
    if (value) {
      this.Department = value;
      this.SearchByDepartmentId();
    }
  }
  constructor(private museumService: MuseumService, private modalService: BsModalService) {

    this.loading$ = new Subject();
   }

  ngOnInit(): void {
    this.Subscribes.push(
      this.loading$.subscribe( (result:boolean) => {
          console.log("boolean:",result);
          this.loading = result;
      }),
      this.museumService.QuerySearch.subscribe( (query:string) => {
        this.skipRows = 0;
        this.takeRows = 6;
        this.TotalPageSize = 0;
        this.page = 1;
        this.SearchByDepartmentId(query)
      })
    )
  }

  SearchByDepartmentId(query:string = null) {
    this.loading = true;
    this.NoDataAvailable = false;
    this.Details = [];
    const { departmentId, displayName } = this.Department;
    let __query = displayName;
    if((query !== null) && (query !== '')){
      __query = query;
    }
    const departmentById: Observable<HttpEvent<any>> = this.museumService.GetDepartmentById(__query, departmentId);
    departmentById
      .subscribe(data => {
        if (data.type === HttpEventType.DownloadProgress) {
        } else if (data.type === HttpEventType.Response) {
          const __objectIds = <ObjectIds>data.body;
          this.TotalPageSize = __objectIds.total;
          if(this.TotalPageSize === 0){
            this.NoDataAvailable = true;
            this.loading = false;
            return false;
          }
          this.museumService.StoreObjectIdsDictonary(departmentId, __objectIds.objectIDs);
          if(this.TotalPageSize>6){
          } else {
            this.takeRows = this.TotalPageSize;
          }
          this.ObjectIds = __objectIds.objectIDs.slice(this.skipRows,this.takeRows);
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
    this.onPageRequest();
  }
  onPrevRecord() {
    if (this.page > 1) {
      this.page -= 1;
    }
    this.onPageRequest();
  }
  private onPageRequest() {
    this.loading$.next(true);
    this.skipRows = (this.page-1) * PAGE_SIZE;
    this.takeRows = PAGE_SIZE;
    const { departmentId } = this.Department;
    if(this.skipRows > this.TotalPageSize){
      this.IsNavButtonVisible = false;
      this.skipRows = this.TotalPageSize;
      const cal = this.skipRows - this.TotalPageSize ;
      this.takeRows = (cal === 0) ? 1 : cal;
    }
    this.ObjectIds = this.museumService.GetObjectIdsDepartment(departmentId, this.skipRows,this.takeRows );
    if(this.ObjectIds.length > 0){
      this.forkJoinRequest();
    }
    if(this.ObjectIds.length === 0 ){
      this.loading$.next(false);
    }
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
      });
      this.loading$.next(false);
    })
  }
 
  ngOnDestroy(){
    this.Subscribes.forEach( sub => {
      sub.unsubcribe();
    })
  }
}
