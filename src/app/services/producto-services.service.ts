import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ProductoServicesService {
  headers = new HttpHeaders()

  constructor(private http: HttpClient) { }

  async consultarProducto() {
    return await new Promise((resolve, reject) => {
      this.http.get("http://127.0.0.1:3333/productos/consultarProducto", { headers: this.headers }).subscribe((resp) => {
        resolve(resp['producto']);
      }, (err) => {
        reject(err);
      }
      );
    });
  }

  async consultarProductoFiltro(codProd: any) {
    return await new Promise((resolve, reject) => {
      this.http.get("http://127.0.0.1:3333/productos/consultarProducto/" + codProd, { headers: this.headers }).subscribe((resp) => {
        resolve(resp['producto']);
      }, (err) => {
        reject(err);
      }
      );
    });
  }

  async insertarProducto(data: any) {
    return await new Promise((resolve, reject) => {
      this.http.post("http://127.0.0.1:3333/productos/insertarProducto", data, { headers: this.headers }).subscribe((resp) => {
        resolve(resp)
      }, (err) => {
        reject(err)
      })
    });
  }
}
