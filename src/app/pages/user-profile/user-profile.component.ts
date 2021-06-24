import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VerProductosComponent } from 'src/app/components/ver-productos/ver-productos.component';
import { ProductoServicesService } from 'src/app/services/producto-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  loading = false;
  codigointerno = ''
  codigobarra = ''
  pvp1 = 0
  pvp2 = 0
  ucosto = 0.0
  descripcion = ""
  codmarca = 0
  tieneiva = false
  recargariva = false
  tieneice = false
  recargarice = false
  porcentajeice = 0
  codmedida = 0
  idcategoria = 0
  estado = true
  multiplos = 0
  nota = ""
  costopromedio = (this.pvp1 + this.pvp2) / 2
  esservicio = false
  peso = 0.0
  volumen = 0.0
  area = 0.0
  dimlargo = 0.0
  dimalto = 0.0
  dimancho = 0.0
  espadre = false
  eshijode = ''
  factorconversion = 0.0
  escompuesto = false
  usaetiqueta = false
  imagen: any = ''
  imagen2: any = ''
  exis_minima = 0
  exis_maxima = 0
  diasxllegarproducto = 0
  produccionxfacturar = false
  fileUpload: any;


  constructor(
    private prodServ: ProductoServicesService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

  }

  async registrarProd() {
    var data = {
      codigointerno: this.codigointerno.trim(),
      codigobarra: this.codigobarra.trim(),
      pvp1: this.pvp1,
      pvp2: this.pvp2,
      ucosto: this.ucosto,
      descripcion: this.descripcion.trim(),
      codmarca: this.codmarca,
      tieneiva: this.tieneiva,
      recargariva: this.recargariva,
      tieneice: this.tieneice,
      recargarice: this.recargarice,
      porcentajeice: this.porcentajeice,
      codmedida: this.codmedida,
      idcategoria: this.idcategoria,
      estado: this.estado,
      multiplos: this.multiplos,
      nota: this.nota.trim(),
      costopromedio: this.costopromedio,
      esservicio: this.esservicio,
      peso: this.peso,
      volumen: this.volumen,
      area: this.area,
      dimlargo: this.dimlargo,
      dimalto: this.dimalto,
      dimancho: this.dimancho,
      espadre: this.espadre,
      eshijode: this.eshijode.trim(),
      factorconversion: this.factorconversion,
      escompuesto: this.escompuesto,
      usaetiqueta: this.usaetiqueta,
      imagen: '',
      exis_minima: this.exis_minima,
      exis_maxima: this.exis_maxima,
      diasxllegarproducto: this.diasxllegarproducto,
      produccionxfacturar: this.produccionxfacturar
    }
    console.log(data);

    await this.prodServ.insertarProducto(data).then((resp: any) => {
      console.log(resp);
      if (resp.status == true) {
        this.registroToast(resp.message)
        this.vaciarFormulario()
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  calcularVolumen() {
    this.volumen = this.dimalto * this.dimancho * this.dimlargo
  }

  calcularArea() {
    this.area = this.dimlargo * this.dimalto
  }

  calcularCostoPromedio() {
    this.costopromedio = (this.pvp1 + this.pvp2) / 2
  }

  registroToast(message: any) {
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

  vaciarFormulario() {
    this.codigointerno = ''
    this.codigobarra = ''
    this.pvp1 = 0
    this.pvp2 = 0
    this.ucosto = 0.0
    this.descripcion = ""
    this.codmarca = 0
    this.tieneiva = false
    this.recargariva = false
    this.tieneice = false
    this.recargarice = false
    this.porcentajeice = 0
    this.codmedida = 0
    this.idcategoria = 0
    this.estado = true
    this.multiplos = 0
    this.nota = ""
    this.costopromedio = (this.pvp1 + this.pvp2) / 2
    this.esservicio = false
    this.peso = 0.0
    this.volumen = 0.0
    this.area = 0.0
    this.dimlargo = 0.0
    this.dimalto = 0.0
    this.dimancho = 0.0
    this.espadre = false
    this.eshijode = ''
    this.factorconversion = 0.0
    this.escompuesto = false
    this.usaetiqueta = false
    this.imagen = ''
    this.imagen2 = ''
    this.exis_minima = 0
    this.exis_maxima = 0
    this.diasxllegarproducto = 0
  }

  setFormulario(prod: any) {
    this.codigointerno = prod.codigointerno
    this.codigobarra = prod.codigobarra
    this.pvp1 = prod.pvp1
    this.pvp2 = prod.pvp2
    this.ucosto = prod.ucosto
    this.descripcion = prod.descripcion
    this.codmarca = prod.codmarca
    this.tieneiva = prod.tieneiva
    this.recargariva = prod.recargariva
    this.tieneice = prod.tieneice
    this.recargarice = prod.recargarice
    this.porcentajeice = prod.porcentajeice
    this.codmedida = prod.codmedida
    this.idcategoria = prod.idcategoria
    this.estado = prod.estado
    this.multiplos = prod.multiplos
    this.nota = prod.nota
    this.costopromedio = prod.costopromedio
    this.esservicio = prod.esservicio
    this.peso = prod.peso
    this.volumen = prod.volumen
    this.area = prod.area
    this.dimlargo = prod.dimlargo
    this.dimalto = prod.dimalto
    this.dimancho = prod.dimancho
    this.espadre = prod.espadre
    this.eshijode = prod.eshijode
    this.factorconversion = prod.factorconversion
    this.escompuesto = prod.escompuesto
    this.usaetiqueta = prod.usaetiqueta
    // this.imagen = prod.imagen
    // this.imagen2 = prod.imagen2
    this.exis_minima = prod.exis_minima
    this.exis_maxima = prod.exis_maxima
    this.diasxllegarproducto = prod.diasxllegarproducto
    this.produccionxfacturar = prod.produccionxfacturar
  }

  async verTodo() {
    this.loading = true
    var prods: any
    await this.prodServ.consultarProducto().then((resp: any) => {
      console.log(resp);
      prods = resp
      prods.sort((a: any, b: any) => a.id - b.id)
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      const dialogRef = this.dialog.open(VerProductosComponent, {
        data: prods,
        // width: '1500px',
        // maxWidth: '1500px'
      });

      this.loading = false;

      dialogRef.afterClosed().subscribe((resp: any) => {
        console.log(resp);
        if (resp != undefined) {
          this.setFormulario(resp)
        }
      })
    });
  }


  // async handleFileInput(files: FileList) {
  //   // this.loading = true;
  //   const formData: FormData = new FormData();
  //   this.fileUpload = files.item(0);
  //   formData.append("image", this.fileUpload, this.fileUpload.name);

  //   await this.SystemService.WSuploadImages(formData)
  //     .then((resp: any) => {
  //       console.log(resp)
  //       if (resp.status == true) {
  //         this.rutaImg = resp.ruta;
  //       } else {
  //         console.log("error");
  //         Swal.fire("Oops!", "Ha ocurrido un error al subir imagen", "error");
  //         return;
  //       }
  //     })
  //     .finally(async () => {
  //       this.loading = false
  //       this.imagenes.push({ rutaFile: this.rutaImg });
  //       console.log(this.imagenes);
  //       await this.LocationService.getPosition().then(pos => {

  //         this.latitud = pos.lat;
  //         this.longitud = pos.lng;

  //       }, error => {
  //         this.loading = false
  //         Swal.fire('Oops!', 'Ha ocurrido un error obteniendo ubicacion, revise los permisos de localizacion o actualice la pagina!', 'error')
  //         console.log(error)
  //       }).finally(async () => {
  //         this.loading = false;
  //       })
  //     });
  // }

  // async eliminarImg(img, i) {
  //   this.SystemService.WSeliminarFotosExt({ img: img }).finally(() => {
  //     this.imagenes.splice(i, 1);
  //   });
  // }

}
