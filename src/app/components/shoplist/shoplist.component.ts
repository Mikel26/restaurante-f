import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShopsService } from 'src/app/services/shops.service';
import { SuppliersService } from 'src/app/services/suppliers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shoplist',
  templateUrl: './shoplist.component.html',
  styleUrls: ['./shoplist.component.scss']
})
export class ShoplistComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ShoplistComponent>,
    private shopServ: ShopsService,
    private suppServ: SuppliersService
  ) { }

  async ngOnInit(): Promise<void> {
    for await (const [i, x] of this.data.entries()) {
      console.log(x.idprovee);
      await this.suppServ.consultarProveedorFiltroID(x.idprovee).then((resp: any) => {
        this.data[i].proveedor = resp[0].nombre
      })
    }
  }

  async editarCompra(idCompra: any) {
    await this.shopServ.consultarCompraFiltro(idCompra).then((resp) => {
      console.log(resp);
      this.dialogRef.close(resp)
    })
  }

  async eliminarCompra(idCompra: any) {
    await this.shopServ.eliminarCompra(idCompra).then((resp: any) => {
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
