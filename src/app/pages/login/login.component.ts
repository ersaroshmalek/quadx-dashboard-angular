import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/auth/login.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  inputType: string = "password";
  errorMessage:string;
  loginMessage: "Logged in success fully"
  
  constructor(
    private log: LoginService,
    private router: Router,
    private _snackBar: MatSnackBar,
    ) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  OnSubmit(event){
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#email').value;
    const password = target.querySelector('#password').value;
    
    this.log.getUserDetails(username, password).subscribe(
      res => {
        if(res.token.access_token != null) {
          this.openSnackBar("Logged in successfully!")
          localStorage.setItem('JWT_TOKEN',res.token.access_token)
          this.router.navigate(['maps'])
        } else {
          this.openSnackBar("Wronge Credentials!")
        }
      },
      error => {
        this.errorMessage = <any>error
        this.openSnackBar("Bad Credentials!")
      })
  }

  openSnackBar(message:string) {
    this._snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  onShowPassword(event) {
    if(event.target.checked){
      this.inputType = "text"
    }
    else {
      this.inputType = "password"
    }
  }
}
