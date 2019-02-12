import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { OrdersModel } from '../../model/orders-model';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  sampledata: any;
  orderArry: any = [];
  EditorderArry: any = [];
  ConfirmOrderArry: any = [];
  getallConfirmOrder: any;
  allclients: any;
  dataSource: any;
  dataSource1: any;
  dataSource2: any;
  dataSource3: any;
  
  submitted = false;
  error: any;
  data: any;
  getallcatorders: any;
  addquantity: any;

  user = new OrdersModel();

  displayedColumns = ['categoryName', 'quantity', 'stock', 'actionsColumn'];
  // displayedColumns = ['categoryName','quantity','addquantity','actionsColumn'];
  displayedColumns3 = ['orderno', 'clientName', 'projectName', 'totalitems', 'purchaseDate', 'actionsColumn'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private orderser: OrdersService, public http: HttpClient, private router: Router,public toastr: ToastrManager) { }

  ngOnInit() {
 
    this.getallconfrmordrs();
    this.getallClients();
    this.getallProjects();
    this.getallCategory();
    //this.getallcatorders();
   
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  getallClients() {

    this.orderser.getClientlist()
      .subscribe((res: OrdersModel) => {
        this.sampledata = res;
        this.dataSource = new MatTableDataSource(this.sampledata);
        console.log("getallClients");
        console.log(this.dataSource);
      },
        err => {
          console.log(err);
        })
  }

  getallProjects() {
    this.orderser.getallClientdetails()
      .subscribe((res: OrdersModel) => {
        // alert("getallProjects");
        this.sampledata = res;
        this.dataSource1 = new MatTableDataSource(this.sampledata);
        console.log(this.dataSource);
        console.log("projects");
      }, err => {
        console.log(err);
      })
  }

  getallCategory() {
    // console.log("login")
    this.orderser.getCatgList()
      .subscribe((res: OrdersModel) => {
        this.sampledata = res;
        this.dataSource2 = new MatTableDataSource(this.sampledata);
        console.log(this.dataSource);
        console.log("res");
      }, err => {
        console.log(err);
      })
  }
  confirmorder() {

   // alert("getorder");
    console.log("this.confirmordr()");
    console.log(this.user)
    console.log(this.orderArry)
    if(this.user.isEdit && this.user.isEdit!=''){
      console.log('edit')
      this.EditorderArry=[];
      for(var i=0;i< this.orderArry.length; i++){
        // console.log(statuss[i].id);
        if( this.orderArry[i].editId ===''){
        console.log( this.orderArry[i].statusName);
        this.EditorderArry.push({
        'categorieId': this.orderArry[i].categorieId,
          'categoryName': this.orderArry[i].categoryName,
          'stock': this.orderArry[i].stock,
          'quantity': this.orderArry[i].quantity,
        }) 

        }
        }
        console.log('EditorderArry');
        console.log(this.EditorderArry);
      this.ConfirmOrderArry = {
        "orderNo": this.user.orderno,
        "clientId": this.user.clientName,
        "projectId": this.user.projectName,
        "requiredDate": this.user.purchaseDate,
        "editId":this.user.isEdit,
        "catdata": this.EditorderArry
      }
      console.log('ConfirmOrderArry');
      console.log(this.ConfirmOrderArry)
      this.orderser.Editconfirmorder(this.ConfirmOrderArry)
        .subscribe((ConfirmOrderArry) => { //alert('k');
          // this.sampledata = res;
          this.dataSource2 = new MatTableDataSource(this.sampledata);
          this.getallconfrmordrs();
        }, err => {
          console.log("error")
         // alert(err);
        })
    }else{
      
    this.ConfirmOrderArry = {
      "orderNo": this.user.orderno,
      "clientId": this.user.clientName,
      "projectId": this.user.projectName,
      "requiredDate": this.user.purchaseDate,
      "catdata": this.orderArry
    }
    console.log(this.ConfirmOrderArry)
    this.orderser.confirmorder(this.ConfirmOrderArry)
      .subscribe((ConfirmOrderArry) => {
        // this.sampledata = res;
        this.dataSource2 = new MatTableDataSource(this.sampledata);
        this.getallconfrmordrs();
      }, err => {
        console.log("error")
       // alert(err);
      })
    }

  }
  getallOrdersBycat(id) {

    console.log(this.user.addquantity);
   // alert(this.user.addquantity);
    this.submitted = true;
    var count = 0;
    this.orderser.getallOrdersBycat(id)
      .subscribe((res) => {
        this.sampledata = res;
        console.log('products')
        console.log(this.sampledata)
        console.log(this.sampledata[0].products.length)
        var i = 0;
        for (i = 0; i < this.sampledata[0].products.length; i++) {
          if (this.sampledata[0].products[i].stock.length > 0) {
            count += this.sampledata[0].products[i].stock.quantity;
          }
        }
        this.getallcatorders = count;
        this.orderArry.push({
          'categorieId': this.sampledata[0].id,
          'categoryName': this.sampledata[0].categoryName,
          'stock': count,
          'quantity': this.user.addquantity,
          "editId":'',
          actionsColumn: this.orderArry.length,
          
        });
        console.log(this.orderArry);
        this.getallcatorders = new MatTableDataSource(this.orderArry);
        // this.getallcatorders=res;
        //alert("success");
        //  console.log(this.getallcatorders)
        //  this.addquantity=this.user.quantity;
        console.log("getallOrdersBycat()");
        console.log(this.getallcatorders);
      }, err => {
        console.log(err);
      })
  }
  deleteCatOrder(ind,id){ 
    this.orderArry.splice(ind, 1);
    this.getallcatorders = new MatTableDataSource(this.orderArry);
    if(id!==''){
      this.orderser.deleteCatOrder(id)
      .subscribe((res: OrdersModel) => {
        this.toastr.errorToastr('Deleted');
        this.getallconfrmordrs();
      }, err => { alert('no');
      alert("delete error");
        console.log(err);
       
      })
    }
  }
  deleteOrder(id){
    var data={ "orderId":id};
    this.orderser.deleteOrder(data)
    .subscribe((res: OrdersModel) => {
      
      this.toastr.errorToastr('Deleted');
      this.getallconfrmordrs();
    }, err => { alert('no');
    alert("delete error");
      console.log(err);
     
    })
  }
  editOrder(id){
    this.orderser.editOrder(id)
    .subscribe((res: OrdersModel) => {
      this.sampledata = res;
      console.log(this.sampledata);
      console.log('editOrderData');
      this.user.clientName=this.sampledata[0].clientId;
      this.user.projectName=this.sampledata[0].projectId;
      this.user.purchaseDate=this.sampledata[0].requiredDate;
      this.user.orderno=this.sampledata[0].orderNo;
      this.user.isEdit=this.sampledata[0].id;
      this.user.categoryName='';
      this.user.addquantity='';
      console.log(this.sampledata[0].orderCategories.length);
      this.orderArry=[];
      for(var i=0;i<this.sampledata[0].orderCategories.length;i++){
        this.orderArry.push({
          'categorieId': this.sampledata[0].orderCategories[i].id,
          'categoryName': this.sampledata[0].orderCategories[i].CategorieData.categoryName,
          'stock': '',
          'quantity':this.sampledata[0].orderCategories[i].quantity,
          'editId':this.sampledata[0].orderCategories[i].id,
          actionsColumn: this.orderArry.length,
          
        });
        console.log(this.orderArry);
        this.getallcatorders = new MatTableDataSource(this.orderArry);
      }
    }, err => { 
      console.log(err);
     
    })
  }
  confirmordr() {

    console.log("conformordder");
  }

  getallconfrmordrs() { 
    this.orderser.getallconfrmordrs()
      .subscribe((res: OrdersModel) => {
        this.sampledata = res;
        this.getallConfirmOrder = new MatTableDataSource(this.sampledata);
        console.log(this.getallConfirmOrder);
        console.log("order success");
      }, err => { alert('no');
        console.log(err);
       
      })
  }

  delete(id) {
    console.log(id);
    this.orderser.delById(id)
      .subscribe((deldt: OrdersModel) => {
        console.log("hi");
       // alert("Succesfully deleted")
        console.log(deldt);
        this.dataSource = deldt;
        console.log(this.dataSource);
        this.getallCategory();
      }, err => {
        console.log(err);

      })
  }



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
}

