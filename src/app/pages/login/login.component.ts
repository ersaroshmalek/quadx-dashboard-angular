import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  errorMessage:string;
  
  constructor(
    private log: LoginService,
    private router: Router,
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
          console.log(res.token.access_token);
          localStorage.setItem('JWT_TOKEN',res.token.access_token)
          this.router.navigate(['maps'])
          console.log(this.log.isLoggedIn())
        } else {
          console.log("Bad credential")
        }
      },
      error => this.errorMessage = <any>error)
  }
}
