import { Injectable } from '@angular/core';
import { StockModel } from '../../app/model/stock-model'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }
  getallProductdetails(): Observable<StockModel> {
    return this.http.get<StockModel>(environment.servicesURL + 'api/Products?filter={"include":{"relation":"CategorieData","scope":{"fields":["categoryName"]}}}');
  }
  getAllProducts(user: StockModel): Observable<StockModel> {
   // return this.http.get<StockModel>(environment.servicesURL + 'api/Products?filter={"where":{"or":[{"SKU_SI_No":'+user.SKU_SI_No+'},{"productCode":'+user.productCode+'},{"catId":'+user.catId+'}]}}');
      return this.http.get<StockModel>(environment.servicesURL + 'api/Products?filter={"where":{"or":[{"SKU_SI_No":"'+user.SKU_SI_No+'"},{"productCode":"'+user.productCode+'"},{"catId":"'+user.catId+'"}]}}');
  }

  getallCatdetails() {
    return this.http.get<StockModel>(environment.servicesURL + 'api/Categories');
  }
  getAllStocks() {
    return this.http.get<StockModel>(environment.servicesURL + 'api/Stocks');
  }
  addStock(user) {
    return this.http.post<StockModel>(environment.servicesURL + 'api/Stocks',user);
  }
}