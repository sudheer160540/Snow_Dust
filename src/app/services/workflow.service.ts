import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Workflow2 } from '../model/workflow';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor( private http: HttpClient ) { }

  
  addWorkFlow(addWorkFlow: Workflow2): Observable<Workflow2> {
    console.log(addWorkFlow);
    return this.http.post<Workflow2>(environment.servicesURL + 'api/Workflows/addWorkflow', addWorkFlow, httpOptions);
  }


  getallWorkFlows(){
    return this.http.get(environment.servicesURL + 'api/Workflows?filter={"include":{"relation":"workflowStatusData"}}')

  }

  getWorkflowById(id) {
    return this.http.get(environment.servicesURL + 'api/Workflows?filter={"where":{"id":"'+ id + '"},"include":{"relation":"workflowStatusData"}}'  );
  }


  statusDelete(id){
    console.log(id);
    return this.http.delete(environment.servicesURL + 'api/WorkflowStatuses/'+ id)
  }

  updateWorkflow(upadtedata:Workflow2){
    console.log(upadtedata)
    return this.http.post<Workflow2>(environment.servicesURL + 'api/Workflows/updateWorkflow', upadtedata, httpOptions);
  }

  delworkFlow(id) {
    console.log(id);
    var del= { "workflowId":id}
    console.log(del);
    return this.http.post(environment.servicesURL + 'api/Workflows/deleteWorkflow',del );

  }

}
