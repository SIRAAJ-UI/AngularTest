
// import * as Interfaces from '../interfaces/models.interfaces';
import * as Interfaces from '../interfaces/model.interfaces';

export class Department implements Interfaces.Department {
    public departmentId: number | undefined;
    public displayName: string | undefined;
}
