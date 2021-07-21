import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrandComponent } from 'src/app/components/brand/brand.component';
import { CategoriesComponent } from 'src/app/components/categories/categories.component';
import { AddonsService } from 'src/app/services/addons.service';
import Swal from 'sweetalert2';

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
  loading = false;
  esEditCat = false
  idCat;
  esEditMed = false
  idMed;
  esEditMar = false
  idMar;

  constructor(
    private addonServ: AddonsService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {

  }

  async verTodoCat() {
    this.loading = true
    var data: any
    await this.addonServ.consultarCategorias().then((resp) => {
      console.log(resp);
      data = resp
      data.sort((a: any, b: any) => a.id - b.id)
    }).catch((err) => {
      console.log(err);
      this.adviceToast(err.message, 'error')
    }).finally(() => {
      const dialogRef = this.dialog.open(CategoriesComponent, {
        data: { data, title: 'Categorías' }
      });

      this.loading = false;

      dialogRef.afterClosed().subscribe((resp: any) => {
        console.log(resp);
        if (resp != undefined) {
          this.setFormCat(resp)
          this.esEditCat = true;
          this.idCat = resp.id
        }
      })
    });
  }

  async registrarCat() {
    this.loading = true
    var dataCat = {
      descripcion: this.descripcion_cat.trim(),
      abreviacion: this.abrv_cat.trim()
    }

    console.log(dataCat);

    if (this.esEditCat == true) {
      await this.addonServ.modificarCategoria(this.idCat, dataCat).then((resp: any) => {
        console.log(resp);
        if (resp.status == true) {
          this.adviceToast(resp.message, 'success')
          this.vaciarFormularioCat()
        } else {
          this.adviceToast(resp.message, 'error')
        }
      }).catch((err) => {
        console.log(err);
        this.adviceToast(err.message, 'error')
      }).finally(() => {
        this.loading = false
      })
    } else {
      await this.addonServ.insertarCategoria(dataCat).then((resp: any) => {
        console.log(resp);
        if (resp.status == true) {
          this.adviceToast(resp.message, 'success')
          this.vaciarFormularioCat()
        } else {
          this.adviceToast(resp.message, 'error')
        }
      }).catch((err) => {
        console.log(err);
        this.adviceToast(err.message, 'error')
      }).finally(() => {
        this.loading = false
      })
    }
  }

  setFormCat(cat: any) {
    this.descripcion_cat = cat.descripcion
    this.abrv_cat = cat.abreviacion
  }
  setFormMed(med: any) {
    this.descripcion_med = med.descripcion
    this.abrv_med = med.abreviacion
  }
  setFormMar(mar: any) {
    this.descripcion_mar = mar.descripcion
  }

  async verTodoMar() {
    this.loading = true
    var data: any
    await this.addonServ.consultarMarcas().then((resp) => {
      console.log(resp);
      data = resp
      data.sort((a: any, b: any) => a.id - b.id)
    }).catch((err) => {
      console.log(err);
      this.adviceToast(err.message, 'error')
    }).finally(() => {
      const dialogRef = this.dialog.open(BrandComponent, {
        data: { data, title: 'Marcas' },
        // width: '1500px',
        // maxWidth: '1500px'
      });

      this.loading = false;

      dialogRef.afterClosed().subscribe((resp: any) => {
        console.log(resp);
        if (resp != undefined) {
          this.setFormMar(resp)
          this.esEditMar = true;
          this.idMar = resp.id
        }
      })
    });
  }

  async registrarMar() {
    this.loading = true
    var dataMar = {
      descripcion: this.descripcion_mar.trim()
    }

    console.log(dataMar);

    if (this.esEditMar == true) {
      await this.addonServ.modificarMarca(this.idMar, dataMar).then((resp: any) => {
        console.log(resp);
        if (resp.status == true) {
          this.adviceToast(resp.message, 'success')
          this.vaciarFormularioMar()
        } else {
          this.adviceToast(resp.message, 'error')
        }
      }).catch((err) => {
        console.log(err);
        this.adviceToast(err.message, 'error')
      }).finally(() => {
        this.loading = false
      })
    } else {
      await this.addonServ.insertarMarca(dataMar).then((resp: any) => {
        console.log(resp);
        if (resp.status == true) {
          this.vaciarFormularioMar()
          this.adviceToast(resp.message, 'success')
        } else {
          this.adviceToast(resp.message, 'error')
        }
      }).catch((err) => {
        console.log(err);
        this.adviceToast(err.message, 'error')
      }).finally(() => {
        this.loading = false
      })

    }

  }

  async verTodoMed() {
    this.loading = true
    var data: any
    await this.addonServ.consultarMedidas().then((resp) => {
      console.log(resp);
      data = resp
      data.sort((a: any, b: any) => a.id - b.id)
    }).catch((err) => {
      console.log(err);
      this.adviceToast(err.message, 'error')
    }).finally(() => {
      const dialogRef = this.dialog.open(CategoriesComponent, {
        data: { data, title: 'Medidas' },
        // width: '1500px',
        // maxWidth: '1500px'
      });

      this.loading = false;

      dialogRef.afterClosed().subscribe((resp: any) => {
        console.log(resp);
        if (resp != undefined) {
          this.setFormMed(resp)
          this.esEditMed = true;
          this.idMed = resp.id
        }
      })
    });
  }

  async registrarMed() {
    this.loading = true
    var dataMed = {
      descripcion: this.descripcion_med.trim(),
      abreviacion: this.abrv_med.trim()
    }

    console.log(dataMed);

    if (this.esEditMed == true) {
      await this.addonServ.modificarMedida(this.idMed, dataMed).then((resp: any) => {
        console.log(resp);
        if (resp.status == true) {
          this.adviceToast(resp.message, 'success')
          this.vaciarFormularioMed()
        } else {
          this.adviceToast(resp.message, 'error')
        }
      }).catch((err) => {
        console.log(err);
        this.adviceToast(err.message, 'error')
      }).finally(() => {
        this.loading = false
      })
    } else {
      await this.addonServ.insertarMedida(dataMed).then((resp: any) => {
        console.log(resp);
        if (resp.status == true) {
          this.adviceToast(resp.message, 'success')
          this.vaciarFormularioMed()
        } else {
          this.adviceToast(resp.message, 'error')
        }
      }).catch((err) => {
        console.log(err);
        this.adviceToast(err.message, 'error')
      }).finally(() => {
        this.loading = false
      })
    }
  }

  adviceToast(message: any, icon: any) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: icon,
      title: message
    })
  }

  vaciarFormularioCat() {
    this.descripcion_cat = ''
    this.abrv_cat = ''
  }

  vaciarFormularioMed() {
    this.descripcion_med = ''
    this.abrv_med = ''
  }

  vaciarFormularioMar() {
    this.descripcion_mar = ''
  }
}
