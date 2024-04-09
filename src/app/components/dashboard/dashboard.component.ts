import { Component, OnInit  } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserData } from 'src/app/UserData';
import {Subscription} from 'rxjs';
import { UiEffectsService } from 'src/app/services/ui-effects.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  name : string;
  userData : UserData [] ;
  newData : UserData;

  totalUsers : number = 0;

  value : string;

  dataLength : number = 10;
  fromId : number = 0;

  deleteToggle : boolean;
  editToggle: boolean;

  editSubscription : Subscription;
  deleteSubscription : Subscription;

  
  displayedColumns : string[] = ['first_name' , 'last_name' , 'phone' , 'email' , 'country' , 'Action'];
  loader : boolean = true;

  constructor(private userDataService : UserDataService ,
              private uiEffectsService : UiEffectsService,
              private router : Router) {

    this.deleteSubscription = this.uiEffectsService.deleteToggle$.subscribe(value => this.deleteToggle = value)
    this.editSubscription = this.uiEffectsService.editToggle$.subscribe(value => this.editToggle = value)
   
   }

  ngOnInit(): void {
    this.userDataService.getTableData(this.dataLength , this.fromId).subscribe((data) => {
    this.userData = data.body
    this.loader = false 
   });

    this.userDataService.getTotal().subscribe(value => this.totalUsers = value)
   }

   handleDelete(user_id){
    this.userDataService.userDelete(user_id).subscribe(
      () => { 
        this.userData.filter((user) =>  user.user_id == user_id) 
      },
       (error) => console.log(error)
    );
   }


   handleEdit(userData){
    this.router.navigate(["edit" , `${userData.user_id}`]);
   }


   handleEvent(result){
    this.dataLength = result.pageSize

    if(result.pageIndex == 0){
      this.fromId = 0
    }else{
      this.fromId = result.pageIndex * this.dataLength
    }

    this.userDataService.getTableData(this.dataLength , this.fromId).subscribe((data) => {
    this.userData = data.body
    this.loader = false 
     });
    
   }

   handleSearch(){
    this.userDataService.getFilteredData(this.value).subscribe((data) => this.userData = data )
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
    this.uiEffectsService.toggleEdit(this.editToggle)
  }

  

}
