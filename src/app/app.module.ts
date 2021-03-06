import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { NgSelectModule } from '@ng-select/ng-select';

import { UserProfileComponent } from '././pages/user-profile/user-profile.component';
import { AddonsComponent } from './pages/addons/addons.component';
import { IncomesComponent } from './pages/incomes/incomes.component';
import { SalesComponent } from './pages/sales/sales.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { SuppliersComponent } from './pages/suppliers/suppliers.component'

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    NgSelectModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    UserProfileComponent,
    AddonsComponent,
    IncomesComponent,
    SalesComponent,
    ClientsComponent,
    SuppliersComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
