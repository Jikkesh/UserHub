import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginData } from 'src/app/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url : string = "http://localhost:5010/Auth";

  private loggedInSub : BehaviorSubject<boolean> = new BehaviorSubject(this.isLogged());
  public loggedIn$ = this.loggedInSub.asObservable();

  constructor(private http : HttpClient) { 
  }

userSignup(signupData : LoginData) : Observable <any> {
  return this.http.post(`${this._url}/Signup` , signupData);
}

userLogin (loginData : LoginData) : Observable<any> {
  return this.http.post(`${this._url}/Login` , loginData);
}

//User Login Logic

private isLogged() : boolean {
  return localStorage.getItem("token") !== null
}

loggedCall(value : boolean){
this.loggedInSub.next(value);
}

  
}
