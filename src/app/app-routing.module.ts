import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component';
import { ForgotComponent }  from '../app/components/forgot/forgot.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoriesComponent } from './components/categories/categories.component';
import {CategEditComponent} from './components/categ-edit/categ-edit.component';
import {ProductsComponent} from './components/products/products.component';
import {ProdEditComponent} from './components/prod-edit/prod-edit.component';

import {ClientsComponent} from './components/clients/clients.component';
import {ClientproEditComponent} from './components/clientpro-edit/clientpro-edit.component';
import {StockComponent} from './components/stock/stock.component';
import { ClientProjectComponent } from './components/client-project/client-project.component';
import {ClientContactsComponent} from './components/client-contacts/client-contacts.component';
import {ClientContactEditComponent} from './components/client-contact-edit/client-contact-edit.component';
import {ClientEditComponent} from './components/client-edit/client-edit.component';
import { OrdersComponent } from './components/orders/orders.component';
import {MatAllocationComponent} from './components/mat-allocation/mat-allocation.component';
import {WorkflowComponent} from './components/workflow/workflow.component';
import { MomentregisterComponent } from './components/momentregister/momentregister.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component:DashboardComponent
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'forgot', 
    component: ForgotComponent 
  },
  
  { 
    path: 'categories', 
    component: CategoriesComponent 
  },
  { 
    path: 'categedit', 
    component: CategEditComponent 
  },
  { 
    path: 'products', 
    component: ProductsComponent 
  },

  { 
    path: 'productedit', 
    component: ProdEditComponent 
  },
  { 
    path: 'Stock', 
    component: ProdEditComponent 
  },
  { 
    path: 'client', 
    component: ClientsComponent
  },
  // { 
  //   path: 'clientcontact', 
  //   component: ClientEditComponent
  // },
  // { 
  //   path: 'clientcontact-edit', 
  //   component: ClientEditComponent
  // },
  { 
    path: 'stock', 
    component: StockComponent 
    },
 //client project
 {
  path:'clientproject',
  component:ClientProjectComponent
},

{ 
  path: 'clientproedit', 
  component: ClientproEditComponent 
},

{ 
path: 'clientcontactPage', 
component:ClientContactsComponent
},

 { 
path: 'clientcontactedit', 
component: ClientContactEditComponent
},
{ 
  path: 'clientedit', 
  component: ClientEditComponent
  },
{
  path: 'orders',
  component:OrdersComponent
},
{
  path: 'matallocation',
  component:MatAllocationComponent
},
{
  path: 'workflow',
  component:WorkflowComponent
},

{
  path: 'momentregister',
  component:MomentregisterComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
