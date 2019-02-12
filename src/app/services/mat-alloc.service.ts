import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatAllocModel } from '../model/mat-alloc-model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatAllocService {

  constructor(private http: HttpClient) { }


  getClientlist(){
    return this.http.get<MatAllocModel>(environment.servicesURL + 'api/Orders');
  }
  allocselect(arraydata){
    return this.http.post<MatAllocModel>(environment.servicesURL + 'api/Stocks/updateallocate',arraydata);
  }
  GetItemstoAllocate(orderNo,clientId){

    alert(orderNo+'tt'+clientId);
    return this.http.get<MatAllocModel>(environment.servicesURL +'api/Orders?filter={"where":{"or":[{"clientId":"'+clientId+'"},{"orderNo":"'+orderNo+'"}]},"include":{"relation":"orderCategories","scope":{"include":{"relation":"CategorieData","scope":{"fields":["categoryName"]}}}}}');
  }
  viewAvlblty(catid){

  return this.http.get<MatAllocModel>(environment.servicesURL + 'api/Products?filter={"where":{"catId":"'+catid+'"},"include":{"relation":"stock"}}');
    //return this.http.get('192.168.0.124:3000/api/Products?filter={"where":{"catId":"5c5d2d7a3edc95332cc454b1"},"include":{"relation":"stock"}}');
  }

}
