import { Component, OnInit } from '@angular/core';
import { DetailsService } from 'src/app/services/owner/details.service';
import { NgxSpinnerService } from "ngx-spinner";

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { UpdateOService } from 'src/app/services/ownerUpdate/update-o.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  ownerDetails:any = []
  errorMessage: string;
  submitted: boolean = false;


  constructor(private owner:DetailsService,
              private SpinnerService:NgxSpinnerService,
              private _snackBar: MatSnackBar,
              private ownerUpdate: UpdateOService) { }

  ngOnInit() {
    this.getOwnerDetails();
  }

  getOwnerDetails(): void{
    this.SpinnerService.show();
    this.owner.getOwnerDetail().subscribe(
      ownerDetail => {
        this.ownerDetails = ownerDetail;
        console.log("printing owner details",this.ownerDetails  );
        
        this.SpinnerService.hide()
      },
      err => this.errorMessage = <any>err
    )
  }

  openSnackBar(message:string) {
    this._snackBar.open(message, 'Clear', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  onSubmit(){
    this.ownerUpdate.updateOwnerDetails(this.ownerDetails.owner_name,this.ownerDetails.owner_details,this.ownerDetails.address).subscribe(
      data => this.openSnackBar("Profile updated successfully"),
      err => console.log('erorr',err)
    )
    this.getOwnerDetails()
  }

}
