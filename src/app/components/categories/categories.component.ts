import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
//import { CategModel } from '../../model/categ-model';
import { CategService } from '../../services/categ.service';
import { Router } from '@angular/router';
import {CategModel,CategServicesList} from '../../services/categ-services.services';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [
    { provide: CategServicesList, useClass: CategService }
  ]
})
export class CategoriesComponent implements OnInit {

  getdataAll: any;
  editdataAll: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;
  sampledata: any;

  submitted = false;
  error: any;
  categorylist: any;

  displayedColumns = ['catgrycode', 'catgryname', 'catgdesc', 'catgparent', 'actionsColumn'];
  user = new CategModel();
  catListDetails:CategModel[]; 

  constructor(private ser: CategService, public http: HttpClient, private router: Router, private dialog: MatDialog,private catData:CategServicesList,public toastr: ToastrManager) {

  }

  ngOnInit() {
    this.getalldetails();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  add(data) {

    this.submitted = true;
    this.ser.addCateg(this.user).subscribe((res) => {
      this.getalldetails();
      this.toastr.successToastr('Succesfully Categoury is added');
      this.redirect();
    }, (err) => {
      console.log(err);
      this.error = err;
    })

  }
  
  getalldetails() {
    this.catData.getCatgList()
      .subscribe((res: CategModel[]) => {
        this.sampledata = res;
        this.dataSource = new MatTableDataSource(this.sampledata);
        console.log(this.dataSource);
        console.log("res");
      }, err => {
        console.log(err);
      })
 
  }

  edit1(id) {
    this.ser.getDataById(id)
      .subscribe((iddet: CategModel) => {
        console.log(iddet);
        this.dataSource = iddet;
        console.log(this.dataSource);
      }, err => {
        console.log(err);
      })
  }


  catgedit(id) {
    console.log(id);
    this.router.navigate(['/categedit', { id: id }]);
  }


  delete(id) {
    console.log(id);
    this.ser.delById(id)
      .subscribe((deldt: CategModel) => {
        this.toastr.warningToastr("Succesfully deleted");
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

redirect(){
  this.router.navigate(['/categories']);
}

filterByName(filter: string): any {
  const dataFiltered = this.dataSource.filter(function (item) {
    console.log(item.categoryName)
    return item.categoryName.indexOf(filter) > -1
  })
  return dataFiltered;
}
}


