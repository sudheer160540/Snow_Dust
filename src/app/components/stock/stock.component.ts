import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { StockModel } from '../../model/stock-model';
import { StockService } from '../../services/stock.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  getdataAll: any;
  editdataAll: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  //Tabels Code
  dataSource: any;
  dataSource1: any;
  catdataSource:any;
  sampledata: any;
  SearchDataSource: any;
  displayedColumns = ['skuNo', 'date', 'quantity','remarks'];
  displayedColumns1 = ['SKU_SI_No','quantity', 'purchaseDate','remarks'];
  user = new StockModel();
  submitted = false;
  error: any;
  categorylist: any;

  constructor(private stockser: StockService, public http: HttpClient, private router: Router,public toastr: ToastrManager) { }

  ngOnInit() {
    this.getallProductdetails();
    this.getallCatdetails();
    this.getAllStocks();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getAllStocks() {
    this.stockser.getAllStocks()
      .subscribe((res: StockModel) => {
        this.sampledata = res;
        //console.log(res);
        console.log("getAllStocks");
        this.dataSource1 = new MatTableDataSource(this.sampledata);
        console.log(this.dataSource1);
      }, err => {
        console.log(err);
      })
  }
  getAllProducts(res) {
    console.log('getAllProducts');
    console.log(res);
    this.stockser.getAllProducts(this.user)
      .subscribe((res: StockModel) => {
        console.log(res);
        this.sampledata = res;
        this.SearchDataSource = new MatTableDataSource(this.sampledata);
        console.log(this.dataSource);
        console.log("res");

      }, err => {
        console.log('error');
        console.log(err);

      })

  }
  getallProductdetails() {
    console.log("getprdctdetls")
    this.stockser.getallProductdetails()
      .subscribe((res: StockModel) => {
        this.sampledata = res;
        console.log(res);
        console.log("ccres");
        this.dataSource = new MatTableDataSource(this.sampledata);
        console.log(this.dataSource);

      }, err => {
        console.log(err);
      })
  }
  addStock(data) {
    console.log('hi')
    console.log(data)
    this.submitted = true;
    this.stockser.addStock(data).subscribe((res) => {
      console.log(res)
      this.getAllStocks();
      
      this.toastr.successToastr('Stock inserted succesfully');
      this.router.navigate(['/stock']);
    }, (err) => {
      console.log(err);
      this.error = err;

    })

  }
  getallCatdetails() {
    console.log("getallCatdetails")
    this.stockser.getallCatdetails()
      .subscribe((res: StockModel) => {
        console.log("catres");
        console.log(res);
        this.sampledata = res;
        this.catdataSource = new MatTableDataSource(this.sampledata);
        console.log(this.dataSource);
      }, err => {
        console.log(err);
      })
  }
}

