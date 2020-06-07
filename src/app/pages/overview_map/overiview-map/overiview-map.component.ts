import {
  OnInit,
  Component,
  AfterViewInit
} from '@angular/core';
import * as L from 'leaflet';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  NgxSpinnerService
} from "ngx-spinner";
import {
  AssetOverviewService
} from 'src/app/services/asset/get_data_by_date/asset-overview.service';
import * as moment from 'moment';
import {
  AssetService
} from 'src/app/services/asset/get_single_asset/asset.service';
import '../../../../../node_modules/leaflet.fullscreen/Control.FullScreen.js';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-overiview-map',
  templateUrl: './overiview-map.component.html',
  styleUrls: ['./overiview-map.component.css']
})
export class OveriviewMapComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  public map;
  selectedValue: string;
  errorMessage: string;
  tableArray: any =[];
  assetArray:any =[];
  payload: any = []
  bound:any=[];
  registerForm: FormGroup;
  submitted: false;
  moment = moment;
  layerGroup: any;
  markerList: any = []
  dateS: Date = new Date(139063374)
  dateE: Date = new Date();
  startDate: any ;
  endDate: any;
  model:any;


  constructor(
    private formBuilder: FormBuilder,
    private asset: AssetOverviewService,
    private SpinnerService: NgxSpinnerService,
    private assetId: AssetService,
    private _snackBar: MatSnackBar,) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      asset: ['Select Asset', Validators.required],
      sDate: ['', Validators.required],
      eDate: ['', Validators.required],
    })
    // this.initMap();
    this.getAssets();
    // this.getAssetId("3ad28820-8001-11ea-917a-17df4437d17d")
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  // Map definitaion function
  private initMap(): void {

    this.map = L.map('mapData', {
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    this.map.fitWorld()
    L.control.fullscreen({
      position: 'topleft', // change the position of the button can be topleft, topright, bottomright or bottomleft, defaut topleft
      title: 'Show me the fullscreen !', // change the title of the button, default Full Screen
      titleCancel: 'Exit fullscreen mode', // change the title of the button when fullscreen is on, default Exit Full Screen
      content: null, // change the content of the button, can be HTML, default null
      forceSeparateButton: true, // force seperate button to detach from zoom buttons, default false
      forcePseudoFullscreen: true, // force use of pseudo full screen even if full screen API is available, default false
      fullscreenElement: false // Dom element to render in full screen, false by default, fallback to map._container
    }).addTo(this.map);

    this.map.on('enterFullscreen', () => this.map.invalidateSize());
    this.map.on('exitFullscreen', () => this.map.invalidateSize());

  }

  // function to get the asset list with id
  getAssets(): void {
    this.SpinnerService.show();
    this.asset.getAsset().subscribe(
      asset => {
        this.tableArray = asset;
        this.SpinnerService.hide();
      },
      error => this.errorMessage = < any > error
    )
  }
  
  // get time data
  getAssetIdData(id, startDate, endDate) {
    // call the api to get the assset id data
    this.assetId.getAssetById(id, startDate, endDate).subscribe(
      data => {
        this.markerList.map(markerLayer => {
          this.map.removeLayer(markerLayer);
        })
        this.bound = []
        this.markerList = []
        this.payload = []
        this.payload.push(data)
        
        for(let i in this.payload[0].data.payload) {
          if (this.payload[0].data.payload[i].payload.t){
            this.payload[0].data.payload[i].payload.t = this.moment.unix(this.payload[0].data.payload[i].payload.t).format('Do MMMM YYYY, dddd h:mm:ss a')
          }
        }

        var layerGroup = L.layerGroup().addTo(this.map);
        //call the function to display the marker 
        this.getAssetMarker(this.payload)

        //hide the spinner after data is fetched 
        this.SpinnerService.hide()
      },
      err => this.errorMessage = < any > err)
  }


  isExisted(assets, asset_name) {
    for (var i = 0; i < assets.length; ++i) {
        if (assets[i].asset_name == asset_name) {
            return true;
        }
    }
    return false;
}

  onSubmit() {
   try {
     
    if (!this.registerForm.invalid && this.startDate && this.endDate) {
      

      if(!this.isExisted(this.tableArray, this.registerForm.value.asset)){
        throw new Error("Please select Device")
      }
      
      const epochStart = Math.floor( new Date(this.startDate.year, (this.startDate.month - 1 ) > 0 ? (this.startDate.month - 1 ) : 0  , this.startDate.day).getTime() / 1000 );
      const epochEnd = Math.floor( new Date(this.endDate.year, (this.endDate.month - 1) > 0 ? (this.endDate.month - 1): 0 , this.endDate.day ).getTime() / 1000);
      const device = this.registerForm.value.asset
      
      var assetId = ''

      
      this.SpinnerService.show();
      this.tableArray.forEach(i => {
        if (device == i.asset_name) {
          assetId = i.asset_id
        }
      })
      this.getAssetIdData(assetId, epochStart, epochEnd)
    } else {
      this.openSnackBar("Please provide all the inputs")
    }

   } catch (error) {
      this.openSnackBar(error.message);  
  }
  }

  //marker function 
  getAssetMarker(list){
    if(list.length != 0) {
      list[0].data.payload.forEach(arr => {
      
        this.bound.push([arr.payload.lat, arr.payload.lon])
        const lat = arr.payload.lat;
        const lon = arr.payload.lon;
        const message = this.moment.unix(arr.added_on).format('Do MMMM YYYY, dddd h:mm:ss a')
        
        var myIcon = L.icon({
          iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
          // iconUrl:iconUrl,
          iconSize: [25, 41],
          iconAnchor: [12.5, 41],
          popupAnchor: [0, -41],
        });
        const marker = L.marker([lat, lon], {
          icon: myIcon
        }).on('click', (e) => this.map.setView(e.latlng, 18));

        this.markerList.push(marker) //add marker layer to the list
        marker.bindPopup(`<b>${arr.asset_name}</b><br>${message}`).openPopup();
        marker.addTo(this.map);
      })

      if(this.bound.length > 2){
        this.map.fitBounds(this.bound, {
          padding: [70, 70]
        })
      } else if(this.bound.length == 1){
        this.map.setView(this.bound[0],this.bound[1],13)
      } else if(this.bound.length == 0) {
        this.openSnackBar("No data found")
      }
    } else {
      this.openSnackBar("No data found")
    }
  }

  // notification function
  openSnackBar(message:string) {
    this._snackBar.open(message, 'Clear', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  onSelect(asset){
    const lat = asset.payload.lat;
    const lon = asset.payload.lon;
    this.map.setView([lat,lon], 18);
    // this.map.openPopup();
    this.model = "map";
  }

}
