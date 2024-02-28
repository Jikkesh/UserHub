import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { UiEffectsService } from 'src/app/services/ui-effects.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {



  title: string = "welcome";
  logged : boolean;

  private deleteToggle = false;
  private editToggle = false;


  constructor(private router : Router,
              private uiEffectsService : UiEffectsService,
              private authService : AuthService ) 
  {
    this.authService.loggedIn$.subscribe( value => this.logged = value)
  }

  ngOnInit(): void {
  }

  onAdd(){
    this.router.navigate(['register']);
  }

  onDelete(){
    this.deleteToggle = !this.deleteToggle
    this.uiEffectsService.toggleDelete(this.deleteToggle)
  }

  onEdit(){
    this.editToggle = !this.editToggle
    this.uiEffectsService.toggleEdit(!this.editToggle)
  }

  homeToggle(){
    
   if (this.router.url == '/dashboard'){
    return true;
    }
   else{
    return false;
    }

  }

  handleLogout(){
    
    if(this.logged == true) {
      localStorage.removeItem("token")
      this.authService.loggedCall(false);
      this.router.navigate(["login"]);
    }
    
  }

  

}
