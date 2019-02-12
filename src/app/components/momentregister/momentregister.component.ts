import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource,MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { Momentregister } from '../../model/momentregister'
import { MomentregisterService } from '../../services/momentregister.service'


@Component({
  selector: 'app-momentregister',
  templateUrl: './momentregister.component.html',
  styleUrls: ['./momentregister.component.css']
})
export class MomentregisterComponent implements OnInit {
    getdetailsdata:any=[];
    user = new Momentregister();
    searchByCat=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  


  constructor(private  momentser:MomentregisterService) { }

  ngOnInit() {
    this.getAllDetails()
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
    alert(sku);
    alert(productcode);
    alert(catname);
    console.log(sku,productcode,catname)

    this.momentser.searchdetails(sku,productcode,catname).subscribe((data)=>{ alert('k');
      console.log(data);
    },(err)=>{
      console.log(err);
    })

  }

}
