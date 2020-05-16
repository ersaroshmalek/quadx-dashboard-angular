import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { AssetOverviewService } from 'src/app/services/asset/get_data_by_date/asset-overview.service';
import * as moment from 'moment'; 

@Component({
  selector: 'app-otable',
  templateUrl: './otable.component.html',
  styleUrls: ['./otable.component.css']
})
export class OtableComponent implements OnInit {

  selectedValue: string;
  tableArray:any = [];
  submitted:false;
  errorMessage:string;
  date = moment; 
  
  constructor(private asset: AssetOverviewService,private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getData();
  }

  public showData(): void {

  }

  public getData(){
    this.SpinnerService.show();
    this.asset.getAsset().subscribe(data=>{
      this.tableArray = data;
      this.SpinnerService.hide();
    },error => this.errorMessage = <any>error)
  }
}
