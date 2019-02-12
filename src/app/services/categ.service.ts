import { Injectable } from '@angular/core';
//import { CategModel } from '../model/categ-model'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import {CategModel,CategServicesList} from './categ-services.services'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
 
@Injectable({
  providedIn: 'root'
})
export class CategService implements CategServicesList {

  constructor( private http: HttpClient) { }

  addCateg (user: CategModel): Observable<CategModel> {
    console.log(user);
	return this.http.post<CategModel>(environment.servicesURL + 'api/Categories' , user, httpOptions);
}

getCateglist (): Observable<CategModel> {
  
return this.http.get<CategModel>(environment.servicesURL +'api/Categories');

}

getCatgList():Observable<CategModel[]>{
  
return this.http.get<CategModel[]>(environment.servicesURL +'api/Categories?filter={"include":{"relation":"parentData","scope":{"fields":["categoryName"]}}}');;

}
getDataById(id): Observable<CategModel>{
  console.log(id)
  return this.http.get<CategModel>(environment.servicesURL +'api/Categories/'+id);
} 


delById(id): Observable<CategModel>{
  return this.http.delete<CategModel>(environment.servicesURL +'api/Categories/'+id);
} 

updateCatg(user: CategModel,id): Observable<CategModel> {
  console.log(user);
  console.log("user");
  console.log(id);
return this.http.put<CategModel>(environment.servicesURL + 'api/Categories/'+id,user);
}

}
