
import * as Interfaces from '../interfaces/model.interfaces';

export class Department implements Interfaces.Department {
    constructor(public departmentId: number, public displayName: string) {
    }
}

export class ObjectIds {
    constructor(public objectIDs: Array<number>, public total: number) {
    }
}

export class ObjectDetails {
    // artistAlphaSort: "Hooper and Company Henry N."
    // artistDisplayName: "Henry N. Hooper and Company"
    // artistPrefix: "Probably designed by"
    // artistDisplayBio: "ca. 1831–68"
    // primaryImage: "https://images.metmuseum.org/CRDImages/ad/original/192572.jpg"
    // primaryImageSmall: "https://images.metmuseum.org/CRDImages/ad/web-large/192572.jpg"
    // title: "Chandelier"
    // objectName: "Chandelier"
    constructor(public title: string,public objectName: string,public artistAlphaSort: string,public artistDisplayName: string,public artistPrefix: string,public artistDisplayBio: string,public primaryImage: string,public primaryImageSmall: string) {
        
    }
}


