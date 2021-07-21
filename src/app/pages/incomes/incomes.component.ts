import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DiscountComponent } from 'src/app/components/discount/discount.component';
import { ShoplistComponent } from 'src/app/components/shoplist/shoplist.component';
import { ShopsComponent } from 'src/app/components/shops/shops.component';
import { AddonsService } from 'src/app/services/addons.service';
import { ProductoServicesService } from 'src/app/services/producto-services.service';
import { ShopsService } from 'src/app/services/shops.service';
import { SuppliersService } from 'src/app/services/suppliers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss']
})
export class IncomesComponent implements OnInit {
  idprovee = ''
  nota = ''
  usuario = 'mortega' // username
  formapago = '' // catalogo (E)
  total = 0 //
  idusuario = 0 // ignorar de momento
  descuento = 0 // puede ser % o $ (total de la compra) (aplicado por el usuario al total de la compra)
  idopedido = 0 // orden de pedido (ignorar de momento)
  idpreimp = 0 // preimpreso de proveedor
  tienefactura = false // (ignorar de momento)
  serie1 = '001'
  serie2 = '001'
  autori = '' // autorizacion SRI (ignorar de momento)
  ivavigente = 12
  idusuariomodi = 0 // id usuario que modifica una compra (ignorar de momento)
  tipodcosri = 0 // tipo de documento SRI (combo)
  // cantidadF = 0
  // cantidadR = 0
  // pvpF = 0
  pvpDscto = 0
  subtotal1 = 0
  subtotal2 = 0
  // tieneIVA = false
  // lote = ''
  proveedores = []
  productos = []
  formasPago = [{
    id: 1,
    descripcion: 'Efectivo',
    codigo: 'E'
  },
  {
    id: 2,
    descripcion: 'Nota de venta',
    codigo: 'N'
  },
  {
    id: 3,
    descripcion: 'Cheque',
    codigo: 'C'
  }] // catalogo (E)
  dctosSRI = [{
    id: 1,
    descripcion: 'Factura',
    codigo: 'F'
  },
  {
    id: 2,
    descripcion: 'Retención',
    codigo: 'R'
  }]
  IVA: number = 0.12
  ivaTotal = 0
  dscto = 0
  esEdit = false;
  idCompra;
  // subtotal1 = 0
  // total = 0

  constructor(
    private suppServ: SuppliersService,
    private prodServ: ProductoServicesService,
    private addonServ: AddonsService,
    public dialog: MatDialog,
    private shopsServ: ShopsService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.suppServ.consultarProveedor().then((resp: any) => {
      // console.log(resp);
      this.proveedores = resp
    }).catch((err) => {
      console.log(err);
    })

    // await this.shopsServ.consultarCompra().then((resp) => {
    //   console.log(resp);
    // })
  }

  async agregarProd() {
    const dialogRef = this.dialog.open(ShopsComponent);
    // this.loading = false;
    dialogRef.afterClosed().subscribe(async (codProd: any) => {
      console.log(codProd);
      if (codProd != undefined) {
        await this.prodServ.consultarProductoFiltro(codProd).then(async (prod: any) => {
          console.log(prod);
          if (prod.length > 0) {

            for await (const [i, x] of prod.entries()) {
              prod[i].cantidadR = 0;
              prod[i].cantidadF = 0;
              prod[i].pvpF = 0;
              prod[i].dscto = 0;
              prod[i].lote = '';
              console.log(x);
              console.log(i);
              await this.addonServ.consultarMedidasID(x.codmedida).then((result: any) => {
                console.log(result);
                prod[i].medida = result.abreviacion
              }).finally(() => {
                this.registroToast('Producto agregado', 'success')
              })
            }
            this.productos.push(...prod)
            console.log(this.productos);
          } else {
            this.registroToast('No se encontró el producto', 'error')
          }
        }).catch((err) => {
          console.log(err);
        })
      }
    })


  }

  async guardarCompra() {
    let prods = []

    for await (const x of this.productos) {
      prods.push({
        cantidad: x.cantidadF,
        pvp: x.pvpF,
        gravariva: x.tieneiva,
        idproducto: x.id,
        codmedida: x.codmedida,
        cantdevuelta: 0,
        cantrecibida: x.cantidadR,
        descuento: x.dscto,
        pvpproveedor: x.pvpF,
        cantidadproveedor: x.cantidadF,
        nlote: x.lote,
      })
    }

    var data = {
      cabecera: {
        idprovee: this.idprovee,
        nota: this.nota,
        usuario: this.usuario,
        formapago: this.formapago,
        total: this.total,
        idusuario: this.idusuario,
        descuento: this.dscto,
        idopedido: this.idopedido,
        idpreimp: this.idpreimp,
        tienefactura: this.tienefactura,
        serie1: this.serie1,
        serie2: this.serie2,
        autori: this.autori,
        ivavigente: this.ivavigente,
        idusuariomodi: this.idusuariomodi,
        tipodcosri: this.tipodcosri
      },
      detalle: prods
    }
    console.log(data);

    if (this.esEdit == true) {
      await this.shopsServ.modificarCompra(this.idCompra, data).then((resp: any) => {
        console.log(resp);
        if (resp.status == true) {
          this.registroToast(resp.message, 'success')
          this.vaciar()
        }
      }).catch((err) => {
        console.log(err);
      })
    } else {
      await this.shopsServ.insertarCompra(data).then((resp: any) => {
        console.log(resp);
        if (resp.status == true) {
          this.registroToast(resp.message, 'success')
          this.vaciar()
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  limpiarTabla() {
    this.productos = []
  }

  //#region CALCULOS DE LA TABLA
  getSubtotal1() {
    let subTotal = this.redondear(this.productos.reduce((i: any, j: any) => i + j.pvpF * j.cantidadF, 0), 4);
    // localStorage.setItem('subtotal1', this.redondear(subTotal, 4).toString());
    this.redondear(subTotal, 2);
    this.subtotal1 = subTotal
    return subTotal;
  }

  getGravaCon() {
    var grava12 = 0
    // var dsctoAplicado = false
    this.productos.forEach((element: any) => {
      if (element.tieneiva == true) {
        var pvp = this.redondear(element.pvpF, 4)
        grava12 = this.redondear(grava12 + (pvp * element.cantidadF - ((pvp * (element.dscto / 100)) * element.cantidadF)) - this.descuento, 4)
      }
    });
    // grava12 = this.redondear(grava12, 2);
    // localStorage.setItem('base12', this.redondear(grava12, 4).toString());
    // this.redondear(grava12, 2);
    return grava12;
  }

  getGravaSin() {
    var grava0 = 0
    // var dsctoAplicado = false
    this.productos.forEach((element: any) => {
      if (element.tieneiva == false) {
        var pvp = this.redondear(element.pvpF, 4)
        grava0 = this.redondear(grava0 + (pvp * element.cantidadF - ((pvp * (element.dscto / 100)) * element.cantidadF)) - this.descuento, 4)
      }
    });
    // grava0 = this.redondear(grava0, 2);
    // localStorage.setItem('base12', this.redondear(grava0, 4).toString());
    // this.redondear(grava0, 2);
    return grava0;
  }

  getIVA() {
    this.ivaTotal = this.redondear(this.getGravaCon() * this.IVA, 4);
    // localStorage.setItem('ivatotal', this.redondear(this.ivaTotal, 4).toString());
    this.redondear(this.ivaTotal, 2);
    return this.ivaTotal;
  }

  //METOOD USADO PARA CALCULAR EL TOTAL
  getTotal() {
    let total = this.redondear(this.getGravaCon() + this.getGravaSin() + this.getIVA(), 4);
    // localStorage.setItem('total', total.toString());
    this.redondear(total, 2);
    this.total = total
    return total;
  }

  //METODO USADO PARA CALCULAR EL SUBTOTAL 2
  getSubtotal2() {
    let SubT2 = this.redondear(this.getSubtotal1() - this.getDscto(), 4);
    // localStorage.setItem('subtotal', this.redondear(SubT2, 4).toString());
    this.redondear(SubT2, 2);
    return SubT2;
  }

  //METODO USADO PARA CALCULAR EL VALOR DE DESCUENTO
  getDscto() {
    let Dscto = 0
    this.productos.forEach((productos: any) => {
      if (productos.dscto > 0) {
        Dscto = this.redondear(Dscto + (((productos.dscto / 100) * productos.pvpF) * productos.cantidadF) + this.descuento, 4)
      }
    });

    this.redondear(Dscto, 2);
    this.dscto = Dscto
    return Dscto;
  }
  //#endregion

  redondear(numero: any, digitos: any) {
    let base = Math.pow(10, digitos);
    let entero = Math.round(numero * base);
    return entero / base;
  }

  registroToast(message: any, icon: any) {
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

  aplicarDscto() {
    const dialogRef = this.dialog.open(DiscountComponent);

    // this.loading = false;

    dialogRef.afterClosed().subscribe(async (resp: any) => {
      console.log(resp);
      if (resp != undefined) {
        var dscto = 0
        if (resp.option == 1) {
          dscto = this.redondear((resp.valor * 100) / this.subtotal1, 4) // regla de 3 para determinar el % basado en el $
        } else if (resp.option == 2) {
          dscto = this.redondear(resp.valor, 4)
        }
        for await (const x of this.productos) {
          x.dscto = dscto
        }
      }
    })
  }

  async verCompras() {
    var shops = []
    await this.shopsServ.consultarCompra().then((resp: any) => {
      console.log(resp);
      shops = resp
      shops.sort((a: any, b: any) => a.id - b.id)
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      const dialogRef = this.dialog.open(ShoplistComponent, {
        data: shops,
        // width: '1500px',
        // maxWidth: '1500px'
      });

      // this.loading = false;

      dialogRef.afterClosed().subscribe(async (resp: any) => {
        console.log(resp);
        if (resp != undefined) {
          this.esEdit = true
          // this.setFormulario(resp)
          // this.esEdit = true;
          this.idCompra = resp.cabecera[0].id
          this.idprovee = resp.cabecera[0].idprovee
          this.nota = resp.cabecera[0].nota
          this.usuario = resp.cabecera[0].usuario
          this.formapago = resp.cabecera[0].formapago
          this.total = resp.cabecera[0].total
          // this.idusuario = resp.cabecera[0].total
          // this.descuento = resp.cabecera[0].descuento
          this.idopedido = resp.cabecera[0].idopedido
          this.idpreimp = resp.cabecera[0].idpreimp
          this.tienefactura = resp.cabecera[0].tienefactura
          this.serie1 = resp.cabecera[0].serie1.trim()
          this.serie2 = resp.cabecera[0].serie2.trim()
          this.autori = resp.cabecera[0].autori
          this.idusuariomodi = resp.cabecera[0].idusuariomodi
          this.tipodcosri = resp.cabecera[0].tipodcosri
          var productos = resp.detalles
          var prod = []
          for await (const [i, x] of productos.entries()) {
            productos[i].cantidadR = x.cantrecibida;
            productos[i].cantidadF = x.cantidad;
            productos[i].pvpF = x.pvp;
            productos[i].dscto = x.descuento;
            productos[i].lote = x.nlote;
            productos[i].tieneiva = x.gravariva
            productos[i].id = x.idproducto.trim()
            await this.addonServ.consultarMedidasID(x.codmedida).then((result: any) => {
              productos[i].medida = result.abreviacion
            }).finally(() => {
              this.registroToast('Producto agregado', 'success')
            })
            await this.prodServ.consultarProductoFiltroID(x.idproducto.trim()).then(async (prod: any) => {
              console.log(prod);
              productos[i].descripcion = prod[0].descripcion
              productos[i].codigointerno = prod[0].codigointerno
            }).catch((err) => {
              console.log(err);
            })
          }
          // preguntar si quiere agregar y borrar lista de productos o solo agregar
          prod.push(...productos)
          this.productos = prod
          console.log(this.productos);
        }
      })
    });
  }

  vaciar() {
    this.idprovee = ''
    this.nota = ''
    this.usuario = 'mortega'
    this.formapago = ''
    this.total = 0
    this.idusuario = 0
    this.descuento = 0
    this.idopedido = 0
    this.idpreimp = 0
    this.tienefactura = false
    this.serie1 = '001'
    this.serie2 = '001'
    this.autori = ''
    this.idusuariomodi = 0
    this.tipodcosri = 0
    this.productos = []
    this.esEdit = false
  }

}
