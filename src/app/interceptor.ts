import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { LoginService } from "./auth/login.service";
import { Observable } from "rxjs";

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(public authService: LoginService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(localStorage.getItem('JWT_TOKEN') != null) {
            const token = localStorage.getItem('JWT_TOKEN');

            const customReq = request.clone({
                setHeaders: {
                'authorization': `Bearer ${token}`
                }
            })
            return next.handle(customReq);
        } else {
            return next.handle(request);
        }   
    }
}   



