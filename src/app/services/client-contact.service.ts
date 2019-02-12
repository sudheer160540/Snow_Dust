import { Injectable } from '@angular/core';
import { ClientContactModel } from '../../app/model/client-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientContactService {

  constructor(private http: HttpClient) { }
  getClientlist(): Observable<ClientContactModel> {
    return this.http.get<ClientContactModel>(environment.servicesURL + 'api/Clients');
  }
  getallClientConta(): Observable<ClientContactModel> {
    return this.http.get<ClientContactModel>(environment.servicesURL + 'api/clientContacts?filter={"include":{"relation":"clntData","scope":{"fields":"clientName"}}}');
  }
  addContact(user: ClientContactModel): Observable<ClientContactModel> {
    return this.http.post<ClientContactModel>(environment.servicesURL + 'api/clientContacts', user);
  }
  deleteCont(id): Observable<ClientContactModel>{
    return this.http.delete<ClientContactModel>(environment.servicesURL +'api/clientContacts/'+id);
  }
  getDataById(id): Observable<ClientContactModel>{
    return this.http.get<ClientContactModel>(environment.servicesURL +'api/clientContacts/'+id);
  }
  updateContact(user: ClientContactModel,id): Observable<ClientContactModel> {
    return this.http.patch<ClientContactModel>(environment.servicesURL + 'api/clientContacts/'+id,user);
  }
}