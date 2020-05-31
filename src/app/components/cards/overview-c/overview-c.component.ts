import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AListService } from 'src/app/services/asset/asset_list/a-list.service';

@Component({
  selector: 'app-overview-c',
  templateUrl: './overview-c.component.html',
  styleUrls: ['./overview-c.component.css']
})
export class OverviewCComponent implements OnInit {

  assetData:any = [];
  totalAsset: number;
  errorMessage: string;

  constructor(private list: AListService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }
  
  private getData() {
    this.list.getAssetList().subscribe(
      assets => {
        this.assetData = assets
        this.totalAsset = this.assetData.length},
      error => {
        localStorage.clear()
        this.router.navigate(['login'])
        this.errorMessage = <any>error
      }
    )
  }
}
