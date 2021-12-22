import { Component, Input, OnInit } from '@angular/core';
import { Department } from '../client/model';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.sass']
})
export class DepartmentComponent implements OnInit {

  @Input("Department") Department:any;
  constructor() { }

  ngOnInit(): void {
  }

}
