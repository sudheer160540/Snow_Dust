import { Injectable } from '@angular/core';
import { ProductModel } from '../../app/model/product-model'
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  addPrdct (user: ProductModel): Observable<ProductModel> {
    console.log(user);
    console.log("userser");
	return this.http.post<ProductModel>(environment.servicesURL + 'api/Products' , user);
}

getProdlist(): Observable<ProductModel> {
  
  return this.http.get<ProductModel>(environment.servicesURL +'api/Products?filter={"include":{"relation":"CategorieData","scope":{"fields":["categoryName"]}}}');

}
getDataById(id): Observable<ProductModel>{
  return this.http.get<ProductModel>(environment.servicesURL +'api/Products/'+id);
} 
delById(id): Observable<ProductModel>{
  return this.http.delete<ProductModel>(environment.servicesURL +'api/Products/'+id);
} 

updateProd(user: ProductModel,id): Observable<ProductModel> {
  console.log(user);
  console.log("user");
  console.log(id);
  return this.http.put<ProductModel>(environment.servicesURL + 'api/Products/'+id,user);
}

getCateglist (): Observable<ProductModel> {
  
  return this.http.get<ProductModel>(environment.servicesURL +'api/Categories');
  
  }

}
