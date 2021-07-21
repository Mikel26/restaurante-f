import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuppliersService } from 'src/app/services/suppliers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.scss']
})
export class SupplyComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SupplyComponent>,
    private suppServ: SuppliersService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  editarProveedor(prov: any) {
    this.dialogRef.close(prov)
  }

  async eliminarProveedor(idProv: any) {
    await this.suppServ.eliminarProveedor(idProv).then((resp: any) => {
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
