import { Component, OnInit } from '@angular/core';
import { OverviewService } from 'src/app/services/overview/overview.service';
import { AssetOverviewService } from 'src/app/services/asset/get_data_by_date/asset-overview.service';

@Component({
  selector: 'app-overview-c',
  templateUrl: './overview-c.component.html',
  styleUrls: ['./overview-c.component.css']
})
export class OverviewCComponent implements OnInit {

  assetData:any = [];
  totalAsset: number;
  errorMessage: string;

  constructor(private assetOverview: AssetOverviewService) { }

  ngOnInit(): void {
    this.getData();
  }
  
  private getData() {
    this.assetOverview.getAsset().subscribe(
      assets => {
        this.assetData = assets
        this.totalAsset = this.assetData.length},
      error => this.errorMessage = <any>error
    )
  }
}
