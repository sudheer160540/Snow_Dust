import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Workflow, Workflow2 } from '../../model/workflow';
import { WorkflowService } from 'src/app/services/workflow.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent implements OnInit {
  sampleData: any=[];
  sampleData2: any=[];
  statusnames:any=[];
  updateData: any;

  add=true;
  edit=false

  workflow = new Workflow()
  Workflow2 = new Workflow2()
  statusarray = [];
  dataSource: any;
  displayedColumns = ['statuscode', 'statusname', 'actionsColumn'];

  workflowsdata: any;

  dataSource2: any;
  displayedColumns2 = ['workflowcode', 'workflowname', 'workflowstatusdata', 'actionsColumn']; //'workflowstatusdata',

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // @ViewChild('statusCode') redel1:ElementRef;
  // @ViewChild('statusName') redel2:ElementRef;

  @ViewChild('WorkFlowform') formValues; // Added this

  constructor(private http: WorkflowService, private router:Router) { }

  

  ngOnInit() {

   
    console.log("oninit");
    this.statusarray;
    this.getallWorkflows();

    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;

  }

  ngAfterViewInit() {

    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;

  }

  


  /* ******** Filter Function for status code and status data ************* */
  applyFilter1(filterValue: string) {

    console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource)
  }

  /* **********end filter function ******* */

  /* ******** Filter Function for all workflows data ************* */
  applyFilter2(filterValue: string) {
    console.log(filterValue)
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource2)
  }

  /* **********end filter function ******* */


  /*  **********Status add function start*********** */

  statusAdd(data1, data2,id) {

    console.log("add status")
    console.log(data1, data2)
    this.statusarray.push({
      'statusCode': data1,
      'statusName': data2,
      actionsColumn: this.statusarray.length,
      'id':id
    });
    console.log(this.statusarray);

    

    this.dataSource = new MatTableDataSource(this.statusarray);

  }

  /*  **********Status add function end*********** */



  deleteStatus(index,id) {
    alert(index+'//'+id);

    console.log("delete fire")
    console.log(index);
    if(id !== ""){
      console.log("status delete fire to service")
      console.log(id);
      this.http.statusDelete(id).subscribe(res=>{
        console.log(res);
       
        this.getallWorkflows();
        console.log(this.getallWorkflows());

      },err=>{
        console.log(err);
      })
    }
    this.statusarray.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.statusarray);
    console.log(this.dataSource);

    //this.statusarray.splice(index, 1); 


  }

  addWorkFlow() {
    console.log("add fire")

    this.Workflow2.Statusdata = this.statusarray;
    console.log(this.Workflow2)
    console.log(this.Workflow2.editid)

    if(this.Workflow2.editid !== undefined){
      console.log("update fire : editid=" + this.Workflow2.editid);
     
      this.upadateWorkFlow();
    }else {
      console.log('addworkflow')
   console.log("g" + JSON.stringify(this.Workflow2))
    this.http.addWorkFlow(this.Workflow2).subscribe((res) => {
      console.log(res);
      this.getallWorkflows();
      alert("workflow added");
      this.statusarray = [];

      console.log(this.statusarray);
      console.log(this.statusarray.length);
      this.formValues.resetForm();
      console.log(" form reset works")

    }, (err) => {
      console.log(err);
    })
  }

  }


  getallWorkflows() {
    this.http.getallWorkFlows()
      .subscribe((res:[])=> {
        console.log(res);
        // let responsedata :any =res
        // let response= responsedata.length
        // console.log("length="+ response);

        // for(var i=0; i<response; i++){
        //   var rrr= responsedata[i].workflowStatusData.length;
        //   console.log(rrr);
        //   for(var j=0; j<10; j++){
        //     var status= responsedata[3].workflowStatusData[j].statusName;
        //   console.log(status);
        //   var allStatus= allStatus.join(','+ status);
        //   }
        //   responsedata[i]['allStatus']=allStatus;
        //   console.log(responsedata);
        // }

        // let result = res.map(res => res.workflowStatusData);
        // console.log(result);
         
        this.workflowsdata = res
      
        this.dataSource2 = new MatTableDataSource(this.workflowsdata);
        console.log(this.dataSource2)
      }, err => {
        console.log(err);
      })
  }


  EditWorkflow(id) {
    // console.log(id);
    // this.router.navigate(['/workflowedit', { id: id }]);

    this.add = false;
    this.edit = true;

    this.http.getWorkflowById(id).subscribe((res) => {
      console.log(res);
      this.sampleData=res;
      this.sampleData2=this.sampleData[0].workflowStatusData;
      console.log(this.sampleData2.length);
      //console.log(this.sampleData2.length);
     // this.statusarray.push(this.sampleData.workflowStatusData);
     this.Workflow2.workflowCode=this.sampleData[0].workflowCode;
     this.Workflow2.workflowName=this.sampleData[0].workflowName;
     this.Workflow2.editid=this.sampleData[0].id;
     this.Workflow2.workflowStatusId=this.sampleData[0].id;
      var i=0;
      for(i;i<this.sampleData2.length;i++){
      this.statusAdd(this.sampleData2[i].statusCode,this.sampleData2[i].statusName,this.sampleData2[i].id);
      }
     
      console.log(this.statusarray);
      console.log("res");
    }, err => {
      console.log("His")
      console.log(err);
    })
  }


  upadateWorkFlow(){
    console.log("update fire")
    //console.log(data);
    console.log(this.Workflow2)
      //var statuss= data.Statusdata;
      var statuss= this.Workflow2.Statusdata
      console.log(statuss)
     for(var i=0;i<statuss.length; i++){
      // console.log(statuss[i].id);
       if(statuss[i].id ===''){
         console.log(statuss[i].statusName);
        this.statusnames.push({
          'statusCode': statuss[i].statusCode,
          'statusName': statuss[i].statusName,
        }) 

       }
      
     }  console.log(this.statusnames.length);
     this.updateData={
      "workflowName": this.Workflow2.workflowName,
      "workflowCode":  this.Workflow2.workflowCode,
      "workflowId": this.Workflow2.editid,
      "Statusdata":this.statusnames
    }
    this.http.updateWorkflow(this.updateData).subscribe(res=>{
          console.log(res);
          this.statusarray = [];
          this.formValues.resetForm();
          this.getallWorkflows();
          this.router.navigate(['/workflow'])
        })
  }


  deleteWorkFlow(id) {
    console.log(id);
    this.http.delworkFlow(id)
      .subscribe((deldt) => {
        alert("Succesfully deleted")
        console.log(deldt);
        this.dataSource2= deldt;
        console.log(this.dataSource2);
        this.getallWorkflows();
      }, err => {
        console.log(err);

      })
  }


}