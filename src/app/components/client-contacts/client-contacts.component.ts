import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ClientContactModel } from '../../model/client-model';
import { ClientContactService } from '../../services/client-contact.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
 
@Component({
  selector: 'app-client-contacts',
  templateUrl: './client-contacts.component.html',
  styleUrls: ['./client-contacts.component.css']
})

export class ClientContactsComponent implements OnInit {
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  //Tabels Code
  dataSource: any;
  allclients: any;
  sampledata: any;
  
  displayedColumns = ['clientName', 'contactName', 'number', 'email','designation', 'actionsColumn'];
  user = new ClientContactModel();
  submitted = false;
  error: any;
 
  constructor(private clntcontser: ClientContactService, public http: HttpClient, private router: Router,public toastr: ToastrManager) {
    
  }
 
  ngOnInit() {
    // alert("jfdjfdj");
    this.getallClientConta();
    this.getallClients();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getallClients() {
    // console.log("login")
    this.clntcontser.getClientlist()
      .subscribe((res: ClientContactModel) => {
        this.sampledata = res;
        this.allclients = new MatTableDataSource(this.sampledata);
     console.log("getallClients");
     console.log(this.dataSource);
      }, err => {
        console.log(err);

      })
  }
  getallClientConta() {
    // console.log("login")
    this.clntcontser.getallClientConta()
      .subscribe((res: ClientContactModel) => {
        this.sampledata = res;
        this.dataSource = new MatTableDataSource(this.sampledata);
        //alert("getallClientConta succesfully")
     console.log(this.dataSource);
      }, err => {
        console.log(err);

      })
  }
  addContact(data){
    this.submitted = true;
    this.clntcontser.addContact(this.user).subscribe((res) => {
      this.toastr.successToastr('Client Contact Created Successfully');
      this.getallClientConta();
    }, (err) => {
      alert('error');
      this.error = err;
    })
  }
 
  contaEdit(id) {
    this.router.navigate(['/clientcontactedit', { id: id }]);
  }
  deleteCont(id) {
    console.log(id);
    this.clntcontser.deleteCont(id)
      .subscribe((deldt: ClientContactModel) => {
        this.dataSource = deldt;
        this.toastr.warningToastr('Client contact deleted Successfully');
        this.getallClientConta()
      }, err => {
        console.log(err);

      })
  }
 
}