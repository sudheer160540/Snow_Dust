import { Injectable } from '@angular/core';
import { OrdersModel } from '../model/orders-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  constructor(private http: HttpClient) { }

  getClientlist(): Observable<OrdersModel> {
    return this.http.get<OrdersModel>(environment.servicesURL + 'api/Clients');
  }

  getallClientdetails(): Observable<OrdersModel>{
    return this.http.get<OrdersModel>(environment.servicesURL +'api/clientProjects?filter={"include":{"relation":"clientData","scope":{"fields":"clientName"}}}');
  }
  getCatgList(): Observable<OrdersModel> {
    return this.http.get<OrdersModel>(environment.servicesURL +'api/Categories');
    }
    confirmorder (data){
      console.log(data);
      return this.http.post<OrdersModel>(environment.servicesURL + 'api/Orders/addmulitiple' , data);
  }
  Editconfirmorder (data){
      console.log(data);
      return this.http.post<OrdersModel>(environment.servicesURL + 'api/Orders/updateOrder' , data);
  }
    getallOrdersBycat(id): Observable<OrdersModel>{
     console.log("service(user)")
     return this.http.get<OrdersModel>(environment.servicesURL +'api/Categories?filter={"where":{ "id":"'+id+'"},"include":{"relation":"products","scope":{"include":{"relation":"stock"}}}}');
   } 
   editOrder(id): Observable<OrdersModel>{
     return this.http.get<OrdersModel>(environment.servicesURL +'api/Orders?filter={"where":{ "id":"'+id+'"},"include":{"relation":"orderCategories","scope":{"include":{"relation":"CategorieData"}}}}');
   } 
   getallconfrmordrs(){
     console.log("orders service")
     //return this.http.get<OrdersModel>('http://localhost:3000/api/Orders?filter={"include":[{"relation":"orderCategories"},{"relation":"ClientData"},{"relation":"ProjectsData"}]}');
     return this.http.get<OrdersModel>(environment.servicesURL +'api/Orders?filter={"include":[{"relation":"orderCategories"},{"relation":"ClientData"},{"relation":"ProjectsData"}]}');

    }
   delById(id): Observable<OrdersModel>{
    return this.http.delete<OrdersModel>(environment.servicesURL +'api/Orders/'+id);
  } 
  deleteOrder(data): Observable<OrdersModel>{
   console.log(data);
    return this.http.post<OrdersModel>(environment.servicesURL +'api/Orders/deleteOrder',data);
  } 

  deleteCatOrder(id): Observable<OrdersModel>{
    return this.http.delete<OrdersModel>(environment.servicesURL +'api/OrderCategories/'+id);
    }
}
