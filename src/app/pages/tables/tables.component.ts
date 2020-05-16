import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Assets } from 'src/app/services/asset/get_assets/assets.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  tableData:any = [];
  selectedAsset:any;

  constructor(private overview: Assets,private SpinnerService: NgxSpinnerService) { }

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

  onSelect(asset): void {
    this.selectedAsset = asset;
    console.log(this.selectedAsset);
  }
}
