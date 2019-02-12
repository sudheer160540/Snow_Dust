import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ClientModel } from '../../model/client-model';
import { ClientService } from '../../services/client.service';
import { MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  editdataAll: any = [];
  dataSource: any;
  allcateg: any;
  id: any;
  submitted = false;
  user = new ClientModel();
  error: any;
  constructor(public clinser: ClientService, private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {

    this.getClientlist();
    this.id = this.route.snapshot.params['id']
    console.log("Hiedit");
    console.log(this.id);
    // console.log("login")
    this.clinser.getDataById(this.id)
      .subscribe((res: ClientModel) => {
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

  getClientlist() {
    // console.log("login")
    this.clinser.getClientlist()
      .subscribe((res: ClientModel) => {
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
    this.clinser.updateClient(data, this.id)
      .subscribe((res) => {
        console.log("update")
        this.getClientlist();
        alert("Category Updated succesfully")
        this.router.navigate(['/client']);
      }, (err) => {
        console.log(err);
        this.error = err;
      })

  }
}
