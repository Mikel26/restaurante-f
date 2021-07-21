import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  private headers = new HttpHeaders()
  private url = environment.urlWS

  constructor(
    private http: HttpClient
  ) { }

  async consultarProveedor() {
    return await new Promise((resolve, reject) => {
      this.http.get(this.url + '/proveedores/consultarProveedor', { headers: this.headers }).subscribe((resp) => {
        resolve(resp['proveedor'])
      }, (err) => {
        reject(err)
      })
    });
  }

  async consultarProveedorFiltro(ci_ruc: any) {
    return await new Promise((resolve, reject) => {
      this.http.get(this.url + '/proveedores/consultarProveedor/' + ci_ruc, { headers: this.headers }).subscribe((resp) => {
        resolve(resp['proveedor'])
      }, (err) => {
        reject(err)
      })
    });
  }

  async consultarProveedorFiltroID(idProv: any) {
    return await new Promise((resolve, reject) => {
      this.http.get(this.url + '/proveedores/consultarProveedorID/' + idProv, { headers: this.headers }).subscribe((resp) => {
        resolve(resp['proveedor'])
      }, (err) => {
        reject(err)
      })
    });
  }

  async insertarProveedor(data: any) {
    return await new Promise((resolve, reject) => {
      this.http.post(this.url + '/proveedores/insertarProveedor', data, { headers: this.headers }).subscribe((resp) => {
        resolve(resp)
      }, (err) => {
        reject(err)
      })
    });
  }

  async modificarProveedor(idProv: any, data: any) {
    return await new Promise((resolve, reject) => {
      this.http.put(this.url + '/proveedores/modificarProveedor/' + idProv, data, { headers: this.headers }).subscribe((resp) => {
        resolve(resp)
      }, (err) => {
        reject(err)
      })
    });
  }

  async eliminarProveedor(idProv: any) {
    return await new Promise((resolve, reject) => {
      this.http.get(this.url + '/proveedores/eliminarProveedor/' + idProv, { headers: this.headers }).subscribe((resp) => {
        resolve(resp)
      }, (err) => {
        reject(err)
      })
    });
  }
}
