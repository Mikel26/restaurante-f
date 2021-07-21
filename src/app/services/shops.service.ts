import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {
  private headers = new HttpHeaders()
  private url = environment.urlWS

  constructor(
    private http: HttpClient
  ) { }

  async consultarCompra() {
    return await new Promise((resolve, reject) => {
      this.http.get(this.url + '/compras/consultarCompra', { headers: this.headers }).subscribe((resp) => {
        resolve(resp['compras'])
      }, (err) => {
        reject(err)
      })
    });
  }

  async consultarCompraFiltro(idCompra: any) {
    return await new Promise((resolve, reject) => {
      this.http.get(this.url + '/compras/consultarCompraId/' + idCompra, { headers: this.headers }).subscribe((resp) => {
        resolve(resp)
      }, (err) => {
        reject(err)
      })
    });
  }

  async insertarCompra(data: any) {
    return await new Promise((resolve, reject) => {
      this.http.post(this.url + '/compras/insertarCompra', data, { headers: this.headers }).subscribe((resp) => {
        resolve(resp)
      }, (err) => {
        reject(err)
      })
    });
  }

  async modificarCompra(idProv: any, data: any) {
    return await new Promise((resolve, reject) => {
      this.http.put(this.url + '/compras/modificarCompra/' + idProv, data, { headers: this.headers }).subscribe((resp) => {
        resolve(resp)
      }, (err) => {
        reject(err)
      })
    });
  }

  async eliminarCompra(idProv: any) {
    return await new Promise((resolve, reject) => {
      this.http.get(this.url + '/compras/eliminarCompraId/' + idProv, { headers: this.headers }).subscribe((resp) => {
        resolve(resp)
      }, (err) => {
        reject(err)
      })
    });
  }
}
