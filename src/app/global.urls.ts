
import { environment  } from '../environments/environment'

export class AccountAPIUrls {
  static GetAllDepartments: string =  `${environment.appUrl}public/collection/v1/departments`;
  static GetDepartmentById: string =  `${environment.appUrl}public/collection/v1/search`;
  static GetObjectDetails: string =  `${environment.appUrl}public/collection/v1/objects`;

  

}

// https://collectionapi.metmuseum.org/public/collection/v1/search?q=American%20Decorative%20Arts&isHighlight=true&departmentId=5&hasImages=true
