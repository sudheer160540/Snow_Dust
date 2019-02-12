import { Injectable } from '@angular/core';
import { ClientModel } from '../../app/model/client-model'
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  addClient(user: ClientModel): Observable<ClientModel> {

    console.log(user);
    console.log("userser");
   return this.http.post<ClientModel>(environment.servicesURL +'api/Clients/addClient',user);
  
}

getClientlist(): Observable<ClientModel> {
return this.http.get<ClientModel>(environment.servicesURL +'api/Clients?filter={"include":{"relation":"clientContacts"}}');
}
getDataById(id): Observable<ClientModel>{
  return this.http.get<ClientModel>(environment.servicesURL +'api/Clients/'+id);
} 
delById(id): Observable<ClientModel>{
  return this.http.delete<ClientModel>(environment.servicesURL +'api/Clients/'+id);
} 

updateClient(user: ClientModel,id): Observable<ClientModel> {
  console.log(user);
  console.log("user");
  console.log(id);
  return this.http.put<ClientModel>(environment.servicesURL + 'api/Clients/'+id,user);
}
}
