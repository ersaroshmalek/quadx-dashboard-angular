import { Component, OnInit, Input, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  assetNm:string;
}

@Component({
  selector: 'app-asset-add',
  templateUrl: './asset-add.component.html',
  styleUrls: ['./asset-add.component.css']
})
export class AssetAddComponent implements OnInit {

  errorMessage:string;
  submitted:false
  assetN:string;

  constructor(
              public dialogRef: MatDialogRef<AssetAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData
              ) { }

  @Input()
  diameter: number;

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
