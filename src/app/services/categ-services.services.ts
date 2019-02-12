import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class CategModel {
    
    categoryCode: string;
    name: string;
    description:string;
    parentId:string;
    categoryName:string;
   // editid:string;
}

@Injectable()
export abstract class CategServicesList {
  /**
   * Returns a list of all of the current user's todos.
   */
  abstract getCatgList(): Observable<CategModel[]>;
}