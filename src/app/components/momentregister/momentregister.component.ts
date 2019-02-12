import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource,MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { Momentregister } from '../../model/momentregister'
import { MomentregisterService } from '../../services/momentregister.service'
import { WorkflowService } from 'src/app/services/workflow.service';


@Component({
  selector: 'app-momentregister',
  templateUrl: './momentregister.component.html',
  styleUrls: ['./momentregister.component.css']
})
export class MomentregisterComponent implements OnInit {
    getdetailsdata:any=[];
    user = new Momentregister();
    searchByCat=[];

    work

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: any;
  displayedColumns = ['sku/serialNumber','status', 'selectworkflow'];
  workflowsdata:any;
  

  dataSource2:any;
  displayedColumns2=['sku/serialNumber', 'status','workflow']


  constructor(private  momentser:MomentregisterService, private workflowsser :WorkflowService) { }

  ngOnInit() {
    this.getAllDetails()
    this.getAllMomentRegisters()
    console.log(this.getAllMomentRegisters);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    
    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    
    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;

  }

  getAllDetails(){
    this.momentser.getdetails().subscribe((data)=>{
     // console.log(data);
      this.getdetailsdata = data;
      console.log(this.getdetailsdata);
      for(var i=0;i<this.getdetailsdata.length;i++){
        if(this.getdetailsdata[i].CategorieData)
        this.searchByCat.push(this.getdetailsdata[i])
      }
     console.log("CategorieData"+JSON.stringify(this.searchByCat))
    },(err)=>{
      console.log(err);
    })
  }

  searchDetails(search){
    // console.log(search);
    // this.momentser.searchdetails(search).subscribe((data)=>{
    //   console.log(data);
    // },(err)=>{
    //   console.log(err);
    // })
  }

  searchDetail(sku,productcode,catname){
    
    // alert(sku);
    // alert(productcode);
    // alert(catname);

    console.log(sku,productcode,catname)

    this.momentser.searchdetails(sku,productcode,catname).subscribe((data)=>{
      console.log(data);
      this.dataSource=data;
      console.log(this.dataSource);
    },(err)=>{
      console.log(err);
    })
    this.workflowsser.getallWorkFlows().subscribe((dataaa)=>{
      console.log(dataaa);
      // this.dataSource.push(dataaa);
      //  console.log(this.dataSource);
      this.workflowsdata=dataaa;
      console.log(this.workflowsdata);
    })

  }

  addMoment(sku,work){

  console.log(sku,work);

  }

  changeee(a,b){
    console.log(a)
    console.log(b)
    this.momentser.addMomentReg(a,b).subscribe((dattaa)=>{
      console.log(dattaa);
    },(err)=>{
      console.log(err);
    })
  }

  getAllMomentRegisters(){
    this.momentser.getAllMomentRegisters().subscribe((daata)=>{
      console.log(daata)
      this.dataSource2=daata;
      console.log(this.dataSource2)
    },(err)=>{
      console.log(err);
    })
  }

  applyFilter(filterValue: string) {
    console.log(filterValue)
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource2)
  }

}
