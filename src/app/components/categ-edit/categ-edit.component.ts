import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CategService } from '../../services/categ.service';
import { CategModel } from '../../model/categ-model';
import { MatTableDataSource } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-categ-edit',
  templateUrl: './categ-edit.component.html',
  styleUrls: ['./categ-edit.component.css']
})
export class CategEditComponent implements OnInit {
  editdataAll: any = [];
  dataSource: any;
  allcateg: any;
  id: any;
  submitted = false;
  user = new CategModel();
  error: any;
  constructor(public catgser: CategService, private route: ActivatedRoute, private http: HttpClient, private router: Router,public toastr: ToastrManager) { }

  ngOnInit() {

    this.getalldetails();
    this.id = this.route.snapshot.params['id']
    console.log(this.id);

    this.catgser.getDataById(this.id)
      .subscribe((res: CategModel) => {
        this.editdataAll = res;
        this.editdataAll.editId = this.id;
        console.log(this.dataSource);
      }, err => {
        console.log(err);

      })

  }

  getalldetails() {
    this.catgser.getCateglist()
      .subscribe((res: CategModel) => {
        this.allcateg = res;
        this.dataSource = new MatTableDataSource(this.allcateg);
        console.log(this.dataSource);
      }, err => {
        console.log(err);

      })
  }


  updatecatg(data){
    console.log(data)
    this.submitted = true;
    this.catgser.updateCatg(data,this.id)
    .subscribe((res) => {
      this.getalldetails();
      this.toastr.infoToastr("Category Updated succesfully");
      this.router.navigate(['/categories']);
    }, (err) => {
      console.log(err);
      this.error = err;

    })

  }

}
