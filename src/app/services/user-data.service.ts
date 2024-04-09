import { Injectable } from '@angular/core';
import {Observable , Subject} from 'rxjs';
import {HttpClient  , HttpResponse , HttpHeaders } from '@angular/common/http';
import { UserData } from '../UserData';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private _url : string = "http://localhost:5010/users";

  public userCompToggleSub = new Subject<boolean>();
  private userCompToggle$ : Observable<boolean> = this.userCompToggleSub.asObservable();

  private userAddedData : UserData;

  constructor(private http : HttpClient) { }

  getData() : Observable<HttpResponse <any[]> >{
    return this.http.get<string[]>(this._url, 
      {observe : 'response'})
  }


  getTableData(dataLength : number , fromId : number) : Observable<HttpResponse <UserData[]> > {
   return  this.http.get<UserData[]>("http://localhost:5010/usertable" + `?dataLength=${dataLength}&fromId=${fromId} `, 
    {observe : 'response'});
  }

  getTotal() : Observable<number> {
   return this.http.get<number>(`${this._url}/total`)
  }


  addData(userData:UserData) : Observable <UserData> {
    this.userAddedData = userData
    console.log(this.userAddedData)
    return this.http.post<UserData>(this._url,userData);
  }

  userCompToggle() : Observable<boolean> {
  return this.userCompToggle$
  }

  userDelete(user_id) : Observable<any>{
  return this.http.delete(`${this._url}/${user_id}`); 
  }

  userEdit(user_id : number , modifiedData : UserData) : Observable<any>{
  return this.http.put(`${this._url}/${user_id}` , modifiedData) 
  }

  getFilteredData(value : string) : Observable<any>{
   return this.http.get<UserData>(`${this._url}/filter?value=${value}`)
  }



}
