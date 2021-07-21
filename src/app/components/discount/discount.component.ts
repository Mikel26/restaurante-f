import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {
  dscto = 1
  valorDscto = 0

  constructor(
    public dialogRef: MatDialogRef<DiscountComponent>
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    let data = {
      option: this.dscto,
      valor: this.valorDscto
    }
    this.dialogRef.close(data);
  }

}
