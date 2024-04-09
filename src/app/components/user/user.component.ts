import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserData } from 'src/app/UserData';
import { UserService } from '../../services/user.service';
import { UserDataService } from 'src/app/services/user-data.service';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


public user_id ;
userData : UserData;

  constructor(private activatedRoute : ActivatedRoute,
              private userService : UserService,
              private router : Router,
              private userDataService : UserDataService
              ) {
  }

  ngOnInit(): void {

  this.user_id = this.activatedRoute.snapshot.params 
  this.userService.getUser(this.user_id.id).subscribe( 
     (data) => { this.userData = data, console.log(this.userData)
     },
     (error) => console.log(error)
    )
    

  }

  handleBack(){
    this.userDataService.userCompToggleSub.next(false)
    this.router.navigate(['/users'])
  }


 


}
