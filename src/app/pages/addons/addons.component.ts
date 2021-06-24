import { Component, OnInit } from '@angular/core';
import { AddonsService } from 'src/app/services/addons.service';

@Component({
  selector: 'app-addons',
  templateUrl: './addons.component.html',
  styleUrls: ['./addons.component.scss']
})
export class AddonsComponent implements OnInit {
  descripcion_cat = ''
  descripcion_mar = ''
  descripcion_med = ''
  abrv_cat = ''
  abrv_med = ''

  constructor(
    private addonServ: AddonsService
  ) { }

  ngOnInit() {

  }

  verTodoCat() {
    console.log('ver todo categorias');
    this.addonServ.consultarCategorias().then((resp) => {
      console.log(resp);
    }).catch((err: any) => {
      console.log(err);
    })
  }

  registrarCat() {

  }

  verTodoMar() {
    console.log('ver todo marcas');
    this.addonServ.consultarMarcas().then((resp) => {
      console.log(resp);
    }).catch((err: any) => {
      console.log(err);
    })
  }

  registrarMar() {

  }

  verTodoMed() {
    console.log('ver todo medidas');
    this.addonServ.consultarMedidas().then((resp) => {
      console.log(resp);
    }).catch((err: any) => {
      console.log(err);
    })
  }

  registrarMed() {

  }
}
