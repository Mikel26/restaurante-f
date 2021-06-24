import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '' },
  // { path: '/maps', title: 'Mapas',  icon:'ni-pin-3 text-orange', class: '' },
  { path: '/product', title: 'Productos', icon: 'ni-box-2 text-yellow', class: '' },
  { path: '/addons', title: 'Complementos', icon: 'ni-tag text-orange', class: '' },
  { path: '/incomes', title: 'Compras', icon: 'ni-shop text-success', class: '' },
  { path: '/sales', title: 'Ventas', icon: 'ni-cart text-red', class: '' },
  // { path: '/icons', title: 'Iconos', icon: 'ni-planet text-blue', class: '' },
  // { path: '/tables', title: 'Tablas', icon: 'ni-bullet-list-67 text-red', class: '' },
  { path: '/login', title: 'Login', icon: 'ni-key-25 text-info', class: '' },
  { path: '/register', title: 'Registro', icon: 'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
