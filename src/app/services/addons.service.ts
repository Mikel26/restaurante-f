import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddonsService {
  private headers = new HttpHeaders()
  private url = environment.urlWS

  constructor(
    private http: HttpClient
  ) { }

  //#region CRUD CATEGORIAS
  async consultarCategorias() {
    return await new Promise((resolve, reject) => {
      this.http.get(this.url + '/categorias/consultarCategoria', { headers: this.headers }).subscribe((resp) => {
        resolve(resp['categorias'])
      }, (err) => {
        reject(err)
      })
    });
  }

  async insertarCategoria(data: any) {
    return await new Promise((resolve, reject) => {
      this.http.post(this.url + '/categorias/insertarCategoria', data, { headers: this.headers }).subscribe((resp) => {
        resolve(resp)
      }, (err) => {
        reject(err)
      })
    });
  }

  async modificarCategoria(idCat: any, dataCat: any) {
    return await new Promise((resolve, reject) => {
      this.http.put(this.url + '/categorias/modificarCategoria/' + idCat, dataCat, { headers: this.headers }).subscribe((resp) => {
        resolve(resp)
      }, (err) => {
        reject(err)
      })
    });
  }

  async eliminarCategoria(idCat: any) {
    return await new Promise((resolve, reject) => {
      this.http.get(this.url + '/categorias/eliminarCategoria/' + idCat, { headers: this.headers }).subscribe((resp) => {
        resolve(resp)
      }, (err) => {
        reject(err)
      })
    });
  }
  //#endregion

  //#region CRUD MARCAS
  async consultarMarcas() {
    return await new Promise((resolve, reject) => {
      this.http.get(this.url + '/marcas/consultarMarca', { headers: this.headers }).subscribe((resp) => {
        resolve(resp['marcas'])
      }, (err) => {
        reject(err)
      })
    });
  }

  async insertarMarca(data: any) {
    return await new Promise((resolve, reject) => {
      this.http.post(this.url + '/marcas/insertarMarca', data, { headers: this.headers }).subscribe((resp) => {
        resolve(resp)
      })
    });
  }

  async modificarMarca(idMar: any, dataMar: any) {
    return await new Promise((resolve, reject) => {
      this.http.put(this.url + '/marcas/modificarMarca/' + idMar, dataMar, { headers: this.headers }).subscribe((resp) => {
        resolve(resp)
      }, (err) => {
        reject(err)
      })
    });
  }

  async eliminarMarca(idMar: any) {
    return await new Promise((resolve, reject) => {
      this.http.get(this.url + '/marcas/eliminarMarca/' + idMar, { headers: this.headers }).subscribe((resp) => {
        resolve(resp)
      }, (err) => {
        reject(err)
      })
    });
  }
  //#endregion

  //#region CRUD MEDIDAS
  async consultarMedidas() {
    return await new Promise((resolve, reject) => {
      this.http.get(this.url + '/medidas/consultarMedida', { headers: this.headers }).subscribe((resp) => {
        resolve(resp['medidas'])
      }, (err) => {
        reject(err)
      })
    });
  }

  async consultarMedidasID(codmedida: any) {
    return await new Promise((resolve, reject) => {
      this.http.get(this.url + '/medidas/consultarMedidaId/' + codmedida, { headers: this.headers }).subscribe((resp) => {
        resolve(resp['medida'][0])
      }, (err) => {
        reject(err)
      })
    });
  }

  async insertarMedida(data: any) {
    return await new Promise((resolve, reject) => {
      this.http.post(this.url + '/medidas/insertarMedida', data, { headers: this.headers }).subscribe((resp) => {
        resolve(resp)
      }, (err) => {
        reject(err)
      })
    });
  }

  async modificarMedida(idMed: any, dataMed: any) {
    return await new Promise((resolve, reject) => {
      this.http.put(this.url + '/medidas/modificarMedidas/' + idMed, dataMed, { headers: this.headers }).subscribe((resp) => {
        resolve(resp)
      }, (err) => {
        reject(err)
      })
    });
  }

  async eliminarMedida(idMed: any) {
    return await new Promise((resolve, reject) => {
      this.http.get(this.url + '/medidas/eliminarMedida/' + idMed, { headers: this.headers }).subscribe((resp) => {
        resolve(resp)
      }, (err) => {
        reject(err)
      })
    });
  }
  //#endregion

}
