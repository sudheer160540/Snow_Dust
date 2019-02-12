import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../model/product-model';
import { MatTableDataSource } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-prod-edit',
  templateUrl: './prod-edit.component.html',
  styleUrls: ['./prod-edit.component.css']
})
export class ProdEditComponent implements OnInit {
  editdataAll: any = [];
  dataSource: any;
  allcateg: any;
  id: any;
  submitted = false;
  user = new ProductModel();
  error: any;
  constructor(public prodser: ProductService, private route: ActivatedRoute, private http: HttpClient, private router: Router,public toastr: ToastrManager) { }

  ngOnInit() {

    this.getProdlist();
    this.id = this.route.snapshot.params['id']
    console.log("Hiedit");
    console.log(this.id);
    // console.log("login")
    this.prodser.getDataById(this.id)
      .subscribe((res: ProductModel) => {
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

  getProdlist() {
    // console.log("login")
    this.prodser.getProdlist()
      .subscribe((res: ProductModel) => {
        this.allcateg = res;
        this.dataSource = new MatTableDataSource(this.allcateg);
        console.log(this.dataSource);
        console.log("res");
      }, err => {
        console.log(err);
      })
  }


  updateProd(data) {
    console.log('hiupdate')
    console.log(data)
    this.submitted = true;
    this.prodser.updateProd(data, this.id)
      .subscribe((res) => {
        console.log("update")
        this.getProdlist();
        this.toastr.infoToastr('Product Updated succesfully');
       
        this.router.navigate(['/products']);
      }, (err) => {
        console.log(err);
        this.error = err;
      })

  }

}

