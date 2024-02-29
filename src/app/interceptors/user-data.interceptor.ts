import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from '../components/auth/auth.service';
import { Router } from '@angular/router';


@Injectable()
export class UserDataInterceptor implements HttpInterceptor {

  private logged: boolean = false;
  private newReq : HttpRequest<any>;

  constructor(private authService: AuthService,
              private router: Router) 
  {
    this.authService.loggedIn$.subscribe(value => this.logged = value)
  }


  intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.logged) 
    {
      var token = localStorage.getItem("token");
      this.newReq = request.clone({
        setHeaders: {
          "Authorization": token
        }
       
      })
      console.log(this.newReq.headers)
    } else {
      this.newReq = request
      };

    return next.handle(this.newReq)
      .pipe(tap(
        (result) => {

          if (result instanceof HttpResponse) {

            if (result.url.includes("/Login")) {
              
              if (result.status == 200) {
                localStorage.setItem("token", result["body"].webToken)
              }
              else if (result.status == 400) {
                
              }
            }

            if (result.url.includes("/Signup")){

              if (result.status == 200) {
                console.log(result.body["message"])
              }
              else if (result.status == 400) {
                console.log("Bad Request")
              }
              else if (result.status == 409) {
                alert("Email already found")
              }
            }
          }

        },
        (error) => {
          console.log("Error:", error)
        }));

  }


}
