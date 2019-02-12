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
    console.log(sku,productcode,catname);
    return this.http.get(environment.servicesURL + 'api/Products?filter={"where":{"or":[{"SKU_SI_No":"'+sku+'"},{"productCode":"'+productcode+'"},{"catId":"'+catname+'"}]},"include":{"relation":"CategorieData","scope":{"fields":["categoryName"]}}}' )
  }

  addMomentReg(catname,sku){
    console.log(catname,sku)
    return this.http.post(environment.servicesURL + 'api/MomentRegisters/addMomentregister' ,catname,sku);

  }

  getAllMomentRegisters(){
    return this.http.get(environment.servicesURL + 'api/MomentRegisters?filter= {"include":[{"relation":"productData","scope":{"fields":["SKU_SI_No"]}},{"relation":"WorkflowStatusData"}]}')
  }


}
