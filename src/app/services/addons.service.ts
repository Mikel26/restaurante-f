import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddonsService {
  private headers = new HttpHeaders()

  constructor(
    private http: HttpClient
  ) { }

  //#region CRUD CATEGORIAS
  async consultarCategorias() {
    return await new Promise((resolve, reject) => {
      this.http.get('http://127.0.0.1:3333/categorias/consultarCategoria', { headers: this.headers }).subscribe((resp) => {
        resolve(resp['categorias'])
      }, (err) => {
        reject(err)
      })
    });
  }
  //#endregion

  //#region CRUD MARCAS
  async consultarMarcas() {
    return await new Promise((resolve, reject) => {
      this.http.get('http://127.0.0.1:3333/marcas/consultarMarca', { headers: this.headers }).subscribe((resp) => {
        resolve(resp['marcas'])
      }, (err) => {
        reject(err)
      })
    });
  }
  //#endregion

  //#region CRUD MEDIDAS
  async consultarMedidas() {
    return await new Promise((resolve, reject) => {
      this.http.get('http://127.0.0.1:3333/medidas/consultarMedida', { headers: this.headers }).subscribe((resp) => {
        resolve(resp['medidas'])
      }, (err) => {
        reject(err)
      })
    });
  }
  //#endregion

}
