import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ClientProjectModel } from '../model/client-project-model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class ClientProjectService {

  constructor(private http: HttpClient) { }


  addClientProject(clientdet: ClientProjectModel): Observable<ClientProjectModel> {
    console.log(clientdet);
    return this.http.post<ClientProjectModel>(environment.servicesURL + 'api/clientProjects', clientdet, httpOptions);
  }



  getallClientdetails(): Observable<ClientProjectModel> {
    
    return this.http.get<ClientProjectModel>(environment.servicesURL + 'api/clientProjects?filter={"include":{"relation":"clientData","scope":{"fields":"clientName"}}}');
  }

  getDataById(id): Observable<ClientProjectModel> {
    return this.http.get<ClientProjectModel>(environment.servicesURL + 'api/clientProjects/' + id);


  }

  updateClient(client: ClientProjectModel, id): Observable<ClientProjectModel> {
    console.log(client);
    console.log("user");
    console.log(id);
    return this.http.put<ClientProjectModel>(environment.servicesURL + 'api/clientProjects/' + id, client);


  }

  delById(id): Observable<ClientProjectModel> {
    return this.http.delete<ClientProjectModel>(environment.servicesURL + 'api/clientProjects/' + id);

  }

  getClientlist(): Observable<ClientProjectModel> {
    console.log("serclient")
    return this.http.get<ClientProjectModel>(environment.servicesURL + 'api/Clients');
  }

}