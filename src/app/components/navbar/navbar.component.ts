import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/login.service';
import { DetailsService } from 'src/app/services/owner/details.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  errorMessage: string;
  ownerName: any;
  ownerAvtar: any;

  constructor(location: Location,  private element: ElementRef, private router: Router,
                        private logout: LoginService,
                        private owner: DetailsService) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.getAvtar();
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  logOut(){
    this.logout.logout().subscribe(data => {
        console.log("Successfully logout",data);
      });
    }

    getAvtar(): void {
      this.owner.getOwnerDetail().subscribe(
        owner => {
          this.ownerName = owner.owner_name; 
          this.ownerAvtar = owner.avatar;
        },
        err => this.errorMessage = <any>err
      )
    }
  }
