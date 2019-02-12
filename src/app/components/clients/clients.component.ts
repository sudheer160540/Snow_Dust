import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ClientModel } from '../../model/client-model';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var $: any;
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  getdataAll: any;
  editdataAll: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  //Tabels Code
  dataSource: any;
  sampledata: any;
  displayedColumns = ['clientname','website','phone','contactname', 'actionsColumn'];
  user = new ClientModel();
  submitted = false;
  error: any;
  categorylist: any;

  constructor(private clntser: ClientService, public http: HttpClient, private router: Router,public toastr: ToastrManager) {

  }

  ngOnInit() {

    this.getalldetails();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }
  addclient(data){
    alert('hi')
    console.log(data)
    this.submitted = true;
    this.clntser.addClient(this.user).subscribe((res) => {
      console.log(res)
      this.getalldetails();
      this.toastr.successToastr('Client inserted succesfully');

    }, (err) => {
      console.log(err);
      this.error = err;
    })
  }
  getalldetails() {
    // console.log("login")
    this.clntser.getClientlist()

      .subscribe((res: ClientModel) => {
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
    this.clntser.getDataById(id)
      .subscribe((iddet: ClientModel) => {
        console.log("getdata")
        console.log(iddet);

        this.dataSource = iddet;
        console.log(this.dataSource);

      }, err => {
        console.log(err);

      })
  }
  clientedit(id) {
    console.log("prodctpage")
    console.log(id);
    this.router.navigate(['/clientedit', { id: id }]);
  }
  delete(id) {
    console.log(id);
    this.clntser.delById(id)
      .subscribe((deldt: ClientModel) => {
        alert("Succesfully deleted")
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