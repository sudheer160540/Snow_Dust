import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../app/shared/material/material.module';

import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule,NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotComponent } from './components/forgot/forgot.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaincontentComponent } from './layouts/maincontent/maincontent.component';
import { ListService } from './services/list.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CategoriesComponent } from './components/categories/categories.component';

import{ CategService } from '../../src/app/services/categ.service';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ProductsComponent } from './components/products/products.component';
import { CategEditComponent } from './components/categ-edit/categ-edit.component';
import{ NavService } from './services/nav.service';
import { ProdEditComponent } from './components/prod-edit/prod-edit.component';
import{ ProductService } from '../../src/app/services/product.service';
import { StockComponent } from './components/stock/stock.component';
import { StockService } from './services/stock.service';
import { ClientProjectComponent } from './components/client-project/client-project.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientService } from './services/client.service';
import { ClientEditComponent } from './components/client-edit/client-edit.component';
import { ClientContactsComponent } from './components/client-contacts/client-contacts.component';
import { ClientContactEditComponent } from './components/client-contact-edit/client-contact-edit.component';
import { ClientproEditComponent } from './components/clientpro-edit/clientpro-edit.component';
import {ClientProjectService} from './services/client-project.service';
import {ClientContactService} from './services/client-contact.service';
import { OrdersComponent } from './components/orders/orders.component';
import { MatAllocationComponent } from './components/mat-allocation/mat-allocation.component';
import { MomentregisterComponent } from './components/momentregister/momentregister.component'
import { ToastrModule } from 'ng6-toastr-notifications';
import { WorkflowComponent } from './components/workflow/workflow.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ForgotComponent,
    DashboardComponent,
    MaincontentComponent,
    CategoriesComponent,
    SidemenuComponent,
    ToolbarComponent,
    ProductsComponent,
    CategEditComponent,
    ProdEditComponent,
    StockComponent,
    ClientProjectComponent,
    ClientsComponent,
    ClientEditComponent,
    ClientContactsComponent,
    ClientContactEditComponent,
    ClientproEditComponent,
    OrdersComponent,
    MatAllocationComponent,
    MomentregisterComponent,
    WorkflowComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpClientModule ,
    MatSortModule,
    MatPaginatorModule,
    ToastrModule.forRoot()

  ],

  exports: [MatSortModule],
  providers: [ListService,CategService,NavService,ProductService,StockService,ClientService,ClientProjectService,ClientContactService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
