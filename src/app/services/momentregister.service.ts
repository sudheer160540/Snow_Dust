import { Injectable } from '@angular/core';
import { Momentregister } from '../model/momentregister';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MomentregisterService {

  constructor(private http: HttpClient) { }

  getdetails(){
  
    return this.http.get(environment.servicesURL + 'api/Products?filter={"include":{"relation":"CategorieData","scope":{"fields":["categoryName"]}}}')
  
  }

  searchdetails(sku,productcode,catname){
   alert(sku+productcode+catname);
    return this.http.get(environment.servicesURL + 'api/Products?filter={"where":{"or":[{"SKU_SI_No":"'+sku+'"},{"productCode":"'+productcode+'"},{"catId":"'+catname+'"}]},"include":{"relation":"CategorieData","scope":{"fields":["categoryName"]}}}')
  }
}
