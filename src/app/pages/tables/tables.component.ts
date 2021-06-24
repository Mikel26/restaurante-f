import { Component, OnInit } from "@angular/core";
import { ProductoServicesService } from "src/app/services/producto-services.service";

@Component({
  selector: "app-tables",
  templateUrl: "./tables.component.html",
  styleUrls: ["./tables.component.scss"],
})
export class TablesComponent implements OnInit {
  constructor(
    private prodServ: ProductoServicesService
  ) { }

  ngOnInit() {
    // this.prodServ.consultarProductoFiltro('01').then((resp) => {
    //   console.log(resp);
    // }).catch((err) => {
    //   console.log(err);
    // });
  }
}
