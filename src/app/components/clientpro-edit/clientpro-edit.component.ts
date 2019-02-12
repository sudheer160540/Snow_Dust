import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ClientProjectService } from '../../services/client-project.service';
import { ClientProjectModel } from '../../model/client-project-model';
import { MatTableDataSource } from '@angular/material';
import {FormControl} from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
 
@Component({
  selector: 'app-clientpro-edit',
  templateUrl: './clientpro-edit.component.html',
  styleUrls: ['./clientpro-edit.component.css']
})
export class ClientproEditComponent implements OnInit {
  editdataAll: any = [];
  dataSource: any;
  allcateg: any;
  id: any;
  submitted = false;
  user = new ClientProjectModel();
  error: any;

  constructor(public clientProSer: ClientProjectService, private route: ActivatedRoute, private http: HttpClient, private router: Router,public toastr: ToastrManager) { }

  ngOnInit() {

    this.getClientList();
    this.id = this.route.snapshot.params['id']
    console.log("Hiedit");
    console.log(this.id);
    // console.log("login")
    this.clientProSer.getDataById(this.id)
      .subscribe((res: ClientProjectModel) => {
        this.editdataAll = res;
        //this.dataSource = new MatTableDataSource(this.editdataAll);
        this.editdataAll.editId = this.id;
        console.log(this.dataSource);
        console.log("res");
      }, err => {
        console.log("His")
        console.log(err);
      })
  }

  getClientList() {
    // console.log("login")
    this.clientProSer.getallClientdetails()
      .subscribe((res: ClientProjectModel) => {
        this.allcateg = res;
        this.dataSource = new MatTableDataSource(this.allcateg);
        console.log(this.dataSource);
        console.log("res");
      }, err => {
        console.log(err);
      })
  }

  
  updateClient(data) {
    console.log('hiupdate')
    console.log(data)
    this.submitted = true;
    this.clientProSer.updateClient(data, this.id)
      .subscribe((res) => {
        console.log("update")
        this.getClientList();
        this.toastr.infoToastr('Client Project Updated Succesfully');
        this.router.navigate(['/clientproject']);
      }, (err) => {
        console.log(err);
        this.error = err;
      })

  }

date = new FormControl(new Date());
serializedDate = new FormControl((new Date()).toISOString());

}
