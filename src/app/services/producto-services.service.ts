import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProductoServicesService {
  private headers = new HttpHeaders()
  private url = environment.urlWS

  constructor(private http: HttpClient) { }

  async consultarProducto() {
    return await new Promise((resolve, reject) => {
      this.http.get(this.url + "/productos/consultarProducto", { headers: this.headers }).subscribe((resp) => {
        resolve(resp['producto']);
      }, (err) => {
        reject(err);
      });
    });
  }

  async consultarProductoFiltro(codProd: any) {
    return await new Promise((resolve, reject) => {
      this.http.get(this.url + "/productos/consultarProducto/" + codProd, { headers: this.headers }).subscribe((resp) => {
        resolve(resp['producto']);
      }, (err) => {
        reject(err);
      });
    });
  }

  async consultarProductoFiltroID(idProd: any) {
    return await new Promise((resolve, reject) => {
      this.http.get(this.url + "/productos/consultarProductoID/" + idProd, { headers: this.headers }).subscribe((resp) => {
        resolve(resp['producto']);
      }, (err) => {
        reject(err);
      });
    });
  }

  async insertarProducto(data: any) {
    return await new Promise((resolve, reject) => {
      this.http.post(this.url + "/productos/insertarProducto", data, { headers: this.headers }).subscribe((resp) => {
        resolve(resp)
      }, (err) => {
        reject(err)
      })
    });
  }

  async modificarProducto(idProd: any, data: any) {
    return await new Promise((resolve, reject) => {
      this.http.put(this.url + "/productos/modificarProducto/" + idProd, data, { headers: this.headers }).subscribe((resp) => {
        resolve(resp)
      }, (err) => {
        reject(err)
      })
    });
  }

  async eliminarProducto(idProd: any) {
    return await new Promise((resolve, reject) => {
      this.http.get("http://127.0.0.1:3333/productos/eliminarProducto/" + idProd, { headers: this.headers }).subscribe((resp) => {
        resolve(resp)
      }, (err) => {
        reject(err)
      })
    });
  }
}
