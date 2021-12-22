
import * as Interfaces from '../interfaces/model.interfaces';

export class Department implements Interfaces.Department {
    constructor(public departmentId: number, public displayName: string) {

    }
}

export class ObjectIds {
    constructor(public objectIDs: Array<number>, public total: number) {
    }

}