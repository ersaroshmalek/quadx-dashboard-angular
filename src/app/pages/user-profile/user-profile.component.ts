import { Component, OnInit } from '@angular/core';
import { DetailsService } from 'src/app/services/owner/details.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  ownerDetails:any = []
  errorMessage: string;

  constructor(private owner:DetailsService,
              private SpinnerService:NgxSpinnerService,) { }

  ngOnInit() {
    this.getOwnerDetails();
  }

  getOwnerDetails(): void{
    this.SpinnerService.show();
    this.owner.getOwnerDetail().subscribe(
      ownerDetail => {
        this.ownerDetails = ownerDetail;
        console.log("printing owner details",this.ownerDetails);
        
        this.SpinnerService.hide()
      },
      err => this.errorMessage = <any>err
    )
  }

}
