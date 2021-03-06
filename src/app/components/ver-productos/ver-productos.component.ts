import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoServicesService } from 'src/app/services/producto-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-productos',
  templateUrl: './ver-productos.component.html',
  styleUrls: ['./ver-productos.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerProductosComponent implements OnInit {
  public productos = []
  public loading = true

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<VerProductosComponent>,
    private prodServ: ProductoServicesService
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

  editarProducto(prod: any) {
    this.dialogRef.close(prod)
  }

  async eliminarProducto(idProd: any) {
    await this.prodServ.eliminarProducto(idProd).then((resp: any) => {
      console.log(resp);
      if (resp.status == true) {
        this.mensajeToast(resp.message)
        this.dialogRef.close()
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  mensajeToast(message: any) {
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
      icon: 'success',
      title: message
    })
  }

}
