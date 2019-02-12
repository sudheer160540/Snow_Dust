import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { MatAllocModel } from '../../model/mat-alloc-model';
import { MatAllocService } from '../../services/mat-alloc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mat-allocation',
  templateUrl: './mat-allocation.component.html',
  styleUrls: ['./mat-allocation.component.css']
})
export class MatAllocationComponent implements OnInit {
  allorders: any;
  sampledata
  dataSource: any;
  dataSource1: any;
  dataSource2: any;
  GetItemsdata: any;
  orderdata: any;
  viewAvlbltyData: any;
  user = new MatAllocModel();
  checked = false;
  catIdArray=[];
  // displayedColumns = ['categoryName', 'requiredqty', 'availableqty','requirddate','allocatedSku', 'actionsColumn'];
  displayedColumns = ['catgitm', 'requiredqty', 'requiredDate', 'actionsColumn']
  displayedColumns1 = ['select', 'SKU/SerialNumber', 'Inward/PurchaseDate', 'quantity']

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private matserv: MatAllocService, public http: HttpClient, private router: Router) { }

  ngOnInit() {

    this.getClientlist();
    this.allocselect();
    // this.GetItemstoAllocate(orderNo,clientId);
    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;
  }


  ngAfterViewInit() {

    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;

  }
  getClientlist() {
    console.log("");
    this.matserv.getClientlist()
      .subscribe((res: MatAllocModel) => {
        this.sampledata = res;
        this.allorders = new MatTableDataSource(this.sampledata);
        console.log("getallClients");
        console.log(this.allorders);
      },
        err => {
          console.log(err);
        });

  }

  GetItemstoAllocate(orderNo, clientId) {
    this.matserv.GetItemstoAllocate(orderNo, clientId)
      .subscribe((res: MatAllocModel) => {
        this.sampledata = res;
        for (var i = 0; i < this.sampledata[0].orderCategories.length; i++) {
          this.sampledata[0].orderCategories[i]['requiredDate'] = this.sampledata[0].requiredDate;
        }
        console.log(this.sampledata);
        console.log("satya");
        this.GetItemsdata = new MatTableDataSource(this.sampledata[0].orderCategories);
        console.log(this.GetItemsdata);
        console.log("GetItemstoAllocate");
        console.log(this.orderdata);
      },
        err => {
          alert("error");
          console.log(err);
        });
  }

  viewAvlblty(catid) {
    alert(catid);
    this.matserv.viewAvlblty(catid)
      .subscribe((res: MatAllocModel) => {
        this.sampledata = res;
        this.viewAvlbltyData = new MatTableDataSource(this.sampledata);
        console.log("viewAvlblty");
        console.log(this.viewAvlbltyData);
        alert("viewAvlbltyData")
      },
        err => {
          alert("eror")
          console.log(err);
        });

  }
  allocselect() {

    // console.log(this.user);
    console.log(this.catIdArray);
    this.matserv.allocselect(this.catIdArray)
      .subscribe((res: MatAllocModel) => {
     
        console.log("allocselect");
      
      },
        err => {
          alert("allocselect eror")
          console.log(err);
        });
  };

  filterByName(filter: string): any {
    const dataFiltered = this.dataSource.filter(function (item) {
      console.log(item.categoryName)
      return item.categoryName.indexOf(filter) > -1
    })
    return dataFiltered;
  }

  applyFilter(filterValue: string) {
    console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource)
  }


  toggleVisibility(evnet,id:string){
    console.log(evnet.checked)
    var index = this.catIdArray.indexOf(id);
   //var checkIndex= this.catIdArray.indexOf(id)
   if(evnet.checked){
    this.catIdArray.push(id);
  } else {
   
        if (index > -1) {
          this.catIdArray.splice(index, 1);
        }
  }
  console.log(this.catIdArray)
    // this.catIdArray.push(id)
    // console.log(id)
  }
}

