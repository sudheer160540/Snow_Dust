import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
//import { CategModel } from '../../model/categ-model';
import { CategService } from '../../services/categ.service';
import { Router } from '@angular/router';
import { CategModel, CategServicesList } from '../../services/categ-services.services';
import { ClientProjectModel } from '../../model/client-project-model'
import { ClientProjectService } from 'src/app/services/client-project.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-client-project',
  templateUrl: './client-project.component.html',
  styleUrls: ['./client-project.component.css'],
  providers: [
    { provide: CategServicesList, useClass: CategService }
  ]
})
export class ClientProjectComponent implements OnInit {

  getdataAll: any;
  editdataAll: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  //Tabels Code
  dataSource: any;
  sampledata: any;
  displayedColumns = ['ClientName', 'ProjectCode', 'ProjectName', 'Start', 'End', 'actionsColumn'];
  //catListDetails:CategModel[];   
  clientProjectDetails: ClientProjectModel[];

  clientPro = new ClientProjectModel();
  submitted = false;
  error: any;
  categorylist: any;
  allclients: any;


  constructor(private ser: ClientProjectService, public http: HttpClient, private router: Router, 
  private dialog: MatDialog, private catData: CategServicesList,public toastr: ToastrManager) { }

  ngOnInit() {
    console.log("ddddddddddddddddddddddddddddd");
    //this.catListDetails=this.catData.getCatgList();
    this.getallClientdetails();
    this.getClientnames();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getClientnames() {
    console.log("clientnames")
    this.ser.getClientlist()
      .subscribe((res: ClientProjectModel) => {
        this.sampledata = res;
        this.allclients = new MatTableDataSource(this.sampledata);
        console.log("getallClients");
        console.log(this.allclients);
      }, err => {
        console.log(err);

      })
  }
  addClient(data) {
    console.log('hi')
    console.log(data)
    this.submitted = true;
    this.ser.addClientProject(data).subscribe((res) => {
      console.log(res)
      this.getallClientdetails();
      this.toastr.successToastr('Client Project inserted succesfully');
    }, (err) => {
      console.log(err);
      this.error = err;

    })

  }

  getallClientdetails() {
    this.ser.getallClientdetails()
      .subscribe((res: ClientProjectModel) => {

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
      .subscribe((iddet: ClientProjectModel) => {
        console.log("getdata")
        console.log(iddet);
        this.dataSource = iddet;
        console.log(this.dataSource);

      }, err => {
        console.log(err);

      })
  }

  clientProEdit(id) {
    console.log(id);
    this.router.navigate(['/clientproedit', { id: id }]);
  }
  delete(id) {
    console.log(id);
    this.ser.delById(id)
      .subscribe((deldt: ClientProjectModel) => {
        this.toastr.warningToastr('Client Project Succesfully deleted')
        console.log(deldt);
        this.dataSource = deldt;
        console.log(this.dataSource);
        this.getallClientdetails()
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