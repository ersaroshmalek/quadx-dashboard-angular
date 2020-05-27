import { OnInit, Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { AssetOverviewService } from 'src/app/services/asset/get_data_by_date/asset-overview.service';
import * as moment from 'moment';
import { AssetService } from 'src/app/services/asset/get_single_asset/asset.service';

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
  payload:any=[]
  registerForm: FormGroup;
  submitted:false;
  moment = moment; 
  layerGroup:any;
  markerList:any=[]
  
  
  constructor(
              private formBuilder: FormBuilder,
              private asset: AssetOverviewService, 
              private SpinnerService:NgxSpinnerService,
              private assetId: AssetService) {
   }

   ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      asset: ['', Validators.required],
    })
    // this.initMap();
    this.getAssets();
    // this.getAssetId("3ad28820-8001-11ea-917a-17df4437d17d")
   }

   ngAfterViewInit(): void {
    this.initMap();
   }

    private initMap(): void {
      this.map = L.map('map', {
        center: [39.8282, -98.5795],
        zoom: 3
      });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
    
    tiles.addTo(this.map); 

    // var littleton = L.marker([21.01, 25]).bindPopup('This is Littleton, CO.'),
    // denver    = L.marker([20.3579727, 85.8271403]).bindPopup('This is Denver, CO.') 

    
    // var cities = L.layerGroup([littleton, denver]);

    // var grayscale = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}),
    // streets   = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'});
  
    // this.map = L.map('map', {
    //     center: [21.01, 50],
    //     zoom: 3.5,
    //     layers: [grayscale, cities]
    // });
    

    // var baseMaps = {
    //   "Grayscale": grayscale,
    //   "Streets": streets
    // };
  
    // var overlayMaps = {
    //     "Cities": cities
    // };

    // L.control.layers(baseMaps, overlayMaps).addTo(this.map);

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

// overview on the map
  assetMarker(map: L.map){
    if(this.layerGroup != null){
      map.removeLayer(this.layerGroup)
    }
    this.layerGroup = L.layerGroup().addTo(map);
  
    this.tableArray.forEach(m => {
      const lat = m.payload.d.lat;
      const lon = m.payload.d.lon;
      const message = this.moment.unix(m.added_on).format('Do MMMM YYYY, dddd h:mm:ss a')
      const marker = L.marker([lat, lon]).bindPopup(`<b>${m.asset_name}</b><br>${message}`).openPopup()
      
      //this.layerGroup.addLayer(marker);
      //marker.bindPopup(`<b>${m.asset_name}</b><br>${message}`).openPopup();
    })
    //var overlay = {'markers': this.layerGroup};
    //L.control.layers(null, overlay).addTo(map);
    map.eachLayer(function(layer){
      console.log(layer);
  });
  }


  // get time data
  getAssetIdMarker(id,startDate,endDate){
    this.assetId.getAssetById(id,startDate,endDate).subscribe(
      data => {
        this.markerList.map(markerLayer => {
          this.map.removeLayer(markerLayer);
        })
        this.markerList = []
        this.payload = []
        this.payload.push(data)
        var layerGroup = L.layerGroup().addTo(this.map);
        this.payload[0].data.payload.forEach(arr => {
          console.log("Iteration....",arr)

          const lat = arr.payload.lat;
          const lon = arr.payload.lon;
          const message = this.moment.unix(arr.added_on).format('Do MMMM YYYY, dddd h:mm:ss a')
          console.log(lat, lon);
          
          const marker = L.marker([lat, lon]);
          
          this.markerList.push(marker) //add marker layer to the list
          //layerGroup.addLayer(this.markerList);
          marker.bindPopup(`<b>${arr.asset_name}</b><br>${message}`).openPopup();
          marker.addTo(this.map)
        })
        //var overlay = {'markers1': layerGroup};
        //L.control.layers(null, overlay).addTo(this.map);
        
        this.SpinnerService.hide()},
      err => this.errorMessage = <any>err)
  }

  onSubmit(){
    if(!this.registerForm.invalid){
      const device = this.registerForm.value.asset

      // const start = this.registerForm.value.startDate
      // const end = this.registerForm.value.endDate

      const start = formatDate(this.registerForm.value.startDate,'shortDate','en-US');
      const end = formatDate(this.registerForm.value.endDate,'shortDate','en-US'); 
      var assetId = ''
      
      const epochStart =  Math.floor( (new Date(start).getTime() ) / 1000 );
      const epochEnd =  Math.floor( (new Date(end).getTime() ) / 1000 );

      console.log("start epoch..",epochStart);
      console.log("end epoch..",epochEnd);

      // console.log("printing epochs..",epochStart,epochEnd);
      
      this.SpinnerService.show();
      this.tableArray.forEach(i => {
        if(device == i.asset_name) {
          assetId = i.asset_id
        }
      })
      console.log(assetId);
      this.getAssetIdMarker(assetId,epochStart,epochEnd)
    } 
  }

}


