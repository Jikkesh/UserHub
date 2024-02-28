import { Injectable } from '@angular/core';
import {Observable , Subject}  from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiEffectsService {

  constructor() { }

  deleteToggleSub : Subject<boolean> = new Subject<boolean>();
  deleteToggle$ = this.deleteToggleSub.asObservable();

  
  editToggleSub : Subject<boolean> = new Subject<boolean>();
  editToggle$ = this.editToggleSub.asObservable();


  toggleDelete(value : boolean){
    this.deleteToggleSub.next(value)
  }

  toggleEdit(value : boolean){
    this.editToggleSub.next(value)
  }


}
