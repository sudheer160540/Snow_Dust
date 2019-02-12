import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ClientContactModel } from '../../model/client-model';
import { ClientContactService } from '../../services/client-contact.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-client-contact-edit',
  templateUrl: './client-contact-edit.component.html',
  styleUrls: ['./client-contact-edit.component.css']
})
export class ClientContactEditComponent implements OnInit {
  editdataAll: any = [];
  dataSource: any;
  allcateg: any;
  id: any;
  submitted = false;
  user = new ClientContactModel();
  error: any;
  allclients:any;
  sampledata:any;
  constructor(public clinser: ClientContactService, private route: ActivatedRoute, private http: HttpClient, private router: Router,public toastr: ToastrManager) { }

  ngOnInit() { 
    this.id = this.route.snapshot.params['id'];
    this.clinser.getDataById(this.id)
      .subscribe((res: ClientContactModel) => {
        this.editdataAll = res;
        this.editdataAll.editId = this.id;
      
      }, err => {
        console.log(err);
      })
      this.getallClients();
  }
  updateContact(data) {
    this.submitted = true;
    this.clinser.updateContact(data, this.id)
      .subscribe((res) => {
        this.toastr.successToastr('Client contact updated Success');
        this.router.navigate(['/clientcontactPage']);
      }, (err) => {
        console.log(err);
        this.error = err;
      })

  }
  getallClients() {
    // console.log("login")
    this.clinser.getClientlist()
    .subscribe((res: ClientContactModel) => {
    this.sampledata = res;
    this.allclients = new MatTableDataSource(this.sampledata);
    console.log("getallClients");
    console.log(this.dataSource);
    }, err => {
    console.log(err);
    
    })
    }
}