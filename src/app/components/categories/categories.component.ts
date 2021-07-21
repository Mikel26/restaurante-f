import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddonsService } from 'src/app/services/addons.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CategoriesComponent>,
    private addonServ: AddonsService
  ) {
    console.log(this.data);
  }

  ngOnInit(): void {
  }

  editar(data: any) {
    this.dialogRef.close(data)
  }

  async eliminar(id: any) {
    switch (this.data.title) {
      case 'Categorías':
        await this.addonServ.eliminarCategoria(id).then((resp: any) => {
          console.log(resp);
          if (resp.status == true) {
            this.mensajeToast(resp.message, 'success')
            this.dialogRef.close()
          }
        }).catch((err) => {
          console.log(err);
          this.mensajeToast(err.message, 'error')
        })
        break;

      case 'Medidas':
        await this.addonServ.eliminarMedida(id).then((resp: any) => {
          console.log(resp);
          if (resp.status == true) {
            this.mensajeToast(resp.message, 'success')
            this.dialogRef.close()
          }
        }).catch((err) => {
          console.log(err);
          this.mensajeToast(err.message, 'error')
        })
        break;
    }
  }

  mensajeToast(message: any, icon: any) {
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

}
