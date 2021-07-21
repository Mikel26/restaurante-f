import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VerProductosComponent } from './ver-productos/ver-productos.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandComponent } from './brand/brand.component';
import { SupplyComponent } from './supply/supply.component';
import { ShopsComponent } from './shops/shops.component';
import { FormsModule } from '@angular/forms';
import { DiscountComponent } from './discount/discount.component';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ShoplistComponent } from './shoplist/shoplist.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    VerProductosComponent,
    CategoriesComponent,
    BrandComponent,
    SupplyComponent,
    ShopsComponent,
    DiscountComponent,
    ShoplistComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    VerProductosComponent
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class ComponentsModule { }
