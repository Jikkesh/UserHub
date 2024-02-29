import { Component, OnInit  } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserData } from 'src/app/UserData';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  centered = false;
  disabled = false;
  unbounded = false;

  panelOpenState : boolean = false;

color : string = "blue";
radius : number = 40;

userData : UserData[];
user : UserData;
loader : boolean = true;

userToggle : boolean = false;
nameList : any[];

  constructor(private userDataService : UserDataService,
              private router : Router,
              private activatedRoute : ActivatedRoute,
              private userService : UserService ) { 

    this.userDataService.userCompToggle().subscribe((value) => { 
    this.userToggle = value 
     })
  }

  ngOnInit(): void {
    this.userDataService.getData().subscribe((data) => {
      this.nameList = data.body,
      console.log(this.nameList)
      this.loader = false
    });
  }

  handleClick(user_id){
    this.userDataService.userCompToggleSub.next(true)
    this.router.navigate(['users', 'user' ,`${user_id}`])
  }

  handleEvent(value : any){
   this.userToggle = value
  }

  handleAcc(id : number){
    this.userService.getUser(id).subscribe((data) => this.user = data)
  }



}
