import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../../model/product-model';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
declare var $: any;
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  getdataAll: any;
  editdataAll: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  //Tabels Code
  dataSource: any;
  sampledata: any;
  CatdataSource: any;
  displayedColumns = ['productCode', 'productName','SKU_SI_No','specs', 'actionsColumn'];
  user = new ProductModel();
  submitted = false;
  error: any;
 
  constructor(private ser: ProductService, public http: HttpClient, private router: Router,public toastr: ToastrManager) {

  }

  ngOnInit() {

    this.getalldetails();
    this.getallCatdetails();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }
  getallCatdetails() {
    // console.log("login")

    this.ser.getCateglist()
      .subscribe((res: ProductModel) => {
     
        this.sampledata = res;
        this.CatdataSource = new MatTableDataSource(this.sampledata);
        console.log(this.CatdataSource);
     console.log("CatdataSource");

      }, err => {
        console.log(err);

      })
   
  }
  addPrdct(data) {
    console.log('hi')
    console.log(data)
    this.submitted = true;
    this.ser.addPrdct(this.user).subscribe((res) => {
      console.log(res)
      this.getalldetails();
      this.toastr.successToastr('Product inserted succesfully', 'Success!');
     // alert("Product inserted succesfully")
    }, (err) => {
      alert("Server error")
      console.log(err);
      this.error = err;

    })

  }
 
  getalldetails() {
    // console.log("login")
    this.ser.getProdlist()
      .subscribe((res: ProductModel) => {
        this.sampledata = res;
        this.dataSource = new MatTableDataSource(this.sampledata);
        console.log(this.dataSource);
        console.log("res");
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
  edit1(id) {

    console.log(id);
    this.ser.getDataById(id)
      .subscribe((iddet: ProductModel) => {
        console.log("getdata")
        console.log(iddet);
        this.dataSource = iddet;
        console.log(this.dataSource);

      }, err => {
        console.log(err);

      })
  }
  prodedit(id) {
    console.log("prodctpage")
    console.log(id);
    this.router.navigate(['/productedit', { id: id }]);
  }
  delete(id) {
    console.log(id);
    this.ser.delById(id)
      .subscribe((deldt: ProductModel) => {
        this.toastr.warningToastr('Product Succesfully deleted');
        console.log(deldt);
        this.dataSource = deldt;
        console.log(this.dataSource);
        this.getalldetails()
      }, err => {
        console.log(err);
      })
  }

  applyFilter(filterValue: string) {
    console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource)
  }

}