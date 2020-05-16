import { OnInit, Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { AssetOverviewService } from 'src/app/services/asset/get_data_by_date/asset-overview.service';
import * as moment from 'moment';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements AfterViewInit, OnInit {

  public map;
  selectedValue: string;
  errorMessage: string;
  tableArray:any=[];
  registerForm: FormGroup;
  submitted:false;
  moment = moment; 
  
  constructor(
              private formBuilder: FormBuilder,
              private asset: AssetOverviewService, 
              private SpinnerService:NgxSpinnerService) {
   }

   ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      asset: ['', Validators.required],
    })
    // this.initMap();
    // this.getAssets();
   }

   ngAfterViewInit(): void {
    this.initMap();
   }

    private initMap(): void {
      // this.map = L.map('map', {
      //   center: [39.8282, -98.5795],
      //   zoom: 3
      // });

    // const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   maxZoom: 19,
    //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    //   });
    
    // tiles.addTo(this.map); 
    var littleton = L.marker([21.01, 25]).bindPopup('This is Littleton, CO.'),
    denver    = L.marker([20.3579727, 85.8271403]).bindPopup('This is Denver, CO.') 

    
    var cities = L.layerGroup([littleton, denver]);

    var grayscale = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}),
    streets   = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'});
  
    this.map = L.map('map', {
        center: [21.01, 50],
        zoom: 3.5,
        layers: [grayscale, cities]
    });
    

    var baseMaps = {
      "Grayscale": grayscale,
      "Streets": streets
    };
  
    var overlayMaps = {
        "Cities": cities
    };

    L.control.layers(baseMaps, overlayMaps).addTo(this.map);

  }

  getAssets(): void {
    this.SpinnerService.show();
    this.asset.getAsset().subscribe(
      asset => {
        this.tableArray = asset;
        this.assetMarker(this.map);
        this.SpinnerService.hide();
      },
      error => this.errorMessage = <any>error
    )
  }

  assetMarker(map: L.map){
    this.tableArray.forEach(m => {
      const lat = m.payload.d.lat;
      const lon = m.payload.d.lon;
      const message = this.moment.unix(m.added_on).format('Do MMMM YYYY, dddd h:mm:ss a')
      console.log(lat, lon);
      const marker = L.marker([lon, lat]).addTo(map);
      marker.bindPopup(`<b>${m.asset_name}</b><br>${message}`).openPopup();
    })
  }

  onSubmit(){
    if(!this.registerForm.invalid){
      console.log(formatDate(this.registerForm.value.startDate,"mm-dd-yyyy",'en-US'));
    } 
  }

}


