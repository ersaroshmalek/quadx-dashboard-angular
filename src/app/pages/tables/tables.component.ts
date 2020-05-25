import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Assets } from 'src/app/services/asset/get_assets/assets.service';
import {MatDialog} from '@angular/material/dialog';
import { AssetAddComponent } from 'src/app/components/asset/asset-add/asset-add.component';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AddAssetService } from 'src/app/services/asset/add_asset/add-asset.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  tableData:any = [];
  selectedAsset:any;
  name:string;
  errorMessage: string;

  constructor(private overview: Assets,
              private SpinnerService: NgxSpinnerService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private asset: AddAssetService,
              private router: Router,
              ) { }

  ngOnInit() {
    this.getTabelData();
  }

  getTabelData() {
    this.SpinnerService.show(); 
    this.overview.getAssets().subscribe(data => {
      this.tableData = data;
      console.log(this.tableData);
      this.SpinnerService.hide();
    })    
  };

  addAsset(assetName){
      this.asset.addAsset(assetName).subscribe(
        asset => {
          console.log("Asset added successfully");
          this.openSnackBar("Asset addedd successfully");
          this.getTabelData();
        },
        err => {
          this.errorMessage = <any>err
          this.openSnackBar("You are not authorized to add this asset");
          console.log("can add this asset");
        }
      )
    
  }

  openSnackBar(message:string) {
    this._snackBar.open(message, 'End now', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }  

  onSelect(asset): void {
    this.selectedAsset = asset;
    console.log(this.selectedAsset);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AssetAddComponent, {
      data: {name: this.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.addAsset(result)
      }
      
    });
  }
}
