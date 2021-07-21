import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AtiDocumentValidator } from '@devoxs/ati-doc-validator';
import { SupplyComponent } from 'src/app/components/supply/supply.component';
import { SuppliersService } from 'src/app/services/suppliers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  nombre = ''
  ci_ruc = ''
  direccion = ''
  telefono = ''
  contacto = ''
  nota = ''
  empresa = ''
  email = ''
  url = ''
  tipodoc = ''
  loading = false
  esEdit = false
  listaDoc = [
    {
      nombre: 'Cédula',
      id: 'C'
    }, {
      nombre: 'RUC',
      id: 'R'
    }, {
      nombre: 'Pasaporte/Extranjero',
      id: 'E'
    }
  ]
  idProv;

  constructor(
    private suppServ: SuppliersService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  async registrarProv() {
    this.loading = true
    var result = false;
    var data = {
      nombre: this.nombre,
      ci_ruc: this.ci_ruc,
      direccion: this.direccion,
      telefono: this.telefono,
      contacto: this.contacto,
      nota: this.nota,
      empresa: this.empresa,
      email: this.email,
      url: this.url,
      tipodoc: this.tipodoc
    }

    console.log(data);

    switch (this.tipodoc) {
      case 'C':
        result = new AtiDocumentValidator().cedulaValidator(this.ci_ruc).result;
        break;

      case 'R':
        result = new AtiDocumentValidator().rucValidator(this.ci_ruc).result;
        break;

      case 'E':
        result = true
        break;
    }

    if (result == true) {
      if (this.esEdit == true) {
        await this.suppServ.modificarProveedor(this.idProv, data).then((resp: any) => {
          console.log(resp);
          if (resp.status == true) {
            this.adviceToast(resp.message, 'success')
            this.vaciarForm()
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
        await this.suppServ.insertarProveedor(data).then((resp: any) => {
          console.log(resp);
          if (resp.status == true) {
            this.adviceToast(resp.message, 'success')
            this.vaciarForm()
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
    } else {
      this.adviceToast('Hubo un error con el documento de identifiación', 'error')
    }
  }

  async verTodo() {
    this.loading = true
    var provs: any
    await this.suppServ.consultarProveedor().then((resp: any) => {
      console.log(resp);
      provs = resp
      provs.sort((a: any, b: any) => a.id - b.id)
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      const dialogRef = this.dialog.open(SupplyComponent, {
        data: provs,
        // width: '1500px',
        // maxWidth: '1500px'
      });

      this.loading = false;

      dialogRef.afterClosed().subscribe((resp: any) => {
        console.log(resp);
        if (resp != undefined) {
          this.setFormulario(resp)
          this.esEdit = true;
          this.idProv = resp.id
        }
      })
    });
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

  vaciarForm() {
    this.nombre = ''
    this.ci_ruc = ''
    this.direccion = ''
    this.telefono = ''
    this.contacto = ''
    this.nota = ''
    this.empresa = ''
    this.email = ''
    this.url = ''
    this.tipodoc = ''
  }

  setFormulario(data: any) {
    this.nombre = data.nombre
    this.ci_ruc = data.ci_ruc
    this.direccion = data.direccion
    this.telefono = data.telefono
    this.contacto = data.contacto
    this.nota = data.nota
    this.empresa = data.empresa
    this.email = data.email
    this.url = data.url
    this.tipodoc = data.tipodoc
  }

}
