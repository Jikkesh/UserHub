import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserData } from 'src/app/UserData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

userData : UserData[];
loader : boolean = true;

userToggle : boolean;

nameList : any[];

  constructor(private userDataService : UserDataService,
              private router : Router) { 

  }

  ngOnInit(): void {

    this.userDataService.getData().subscribe((data) => {
      this.nameList = data.body,
      this.loader = false
    });

  }

  handleClick(user_id : number){
    this.router.navigate(['user' ,`${user_id}`])
  }





}
