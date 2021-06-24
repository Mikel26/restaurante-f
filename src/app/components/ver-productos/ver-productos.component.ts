import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    public dialogRef: MatDialogRef<VerProductosComponent>
  ) { }

  ngOnInit() {
    console.log(this.data);

    // await this.prodServ.consultarProducto().then((resp: any) => {
    //   console.log(resp);
    //   this.productos = resp
    //   this.loading = false
    // }).catch((err) => {
    //   console.log(err);
    // });
  }

  editarProducto(prod: any) {
    this.dialogRef.close(prod)
  }

}
