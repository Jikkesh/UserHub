import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable } from 'rxjs';
import { UserData } from 'src/app/UserData';

@Injectable({
  providedIn: 'root'
})
export class UserService {

private _url : string = 'http://localhost:5010/user';
  
  constructor( private http : HttpClient) { }

  getUser(user_id : number) : Observable<UserData> {
  return this.http.get<UserData>(`${this._url}/${user_id}`)
  }
 




}
