import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AddonsComponent } from 'src/app/pages/addons/addons.component';
import { IncomesComponent } from 'src/app/pages/incomes/incomes.component';
import { SalesComponent } from 'src/app/pages/sales/sales.component';
import { ClientsComponent } from 'src/app/pages/clients/clients.component';
import { SuppliersComponent } from 'src/app/pages/suppliers/suppliers.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'product', component: UserProfileComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'addons', component: AddonsComponent },
    { path: 'incomes', component: IncomesComponent },
    { path: 'sales', component: SalesComponent },
    { path: 'clients', component: ClientsComponent },
    { path: 'suppliers', component: SuppliersComponent },
];
