import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { UserData } from 'src/app/UserData';
import { UserDataService } from 'src/app/services/user-data.service';
import {Router, ActivatedRoute} from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  title : string;

  formData : FormGroup

  userData : UserData

  edit : boolean = false;
  private editedUserId;

  countries : string [] = ["India" , "America" , "SA" , "Australia"];

  constructor(private formBuilder : FormBuilder ,
              private userDataService : UserDataService,
              private router : Router,
              private activatedRoute : ActivatedRoute,
              private userService : UserService
              )
               { }

  ngOnInit(): void {
    this.formData = this.formBuilder.group({

      first_name :  ['' , Validators.required] ,
      last_name : ['' , Validators.required],
      phone : ['' , Validators.required],
      email : ['' , Validators.required , Validators.email],
      country : ['India' , Validators.required]

    });

   if(this.router.url == '/register') {
      this.title = "Add"
   }
   else{
     this.title = "Edit"
     this.edit = true;

     const user_id  = this.activatedRoute.snapshot.params
     this.editedUserId = user_id.id
     console.log(this.editedUserId)
     this.userService.getUser(this.editedUserId).subscribe((data) => {
       this.formData.setValue({
        'first_name': data.first_name,
        'last_name': data.last_name,
        'phone': data.phone,
        'email': data.email,
        'country': data.country
       })
     })
   }

  }

  emailValid(){
    const emailControl = this.formData.get('email');

    if(emailControl.invalid){
      return true;
    }
      else{
        return false;
      }

    }


  getErrorMessage(){
    const emailControl = this.formData.get('email');

    if(emailControl.hasError("required")){
      return "Enter your Email";
    }
    else if(emailControl.hasError("email")){
      return "Invalid email";
    }
    return "";
  }


  onSubmit(){

   if(this.edit == false) {
      this.userData = this.formData.value;

      this.userDataService.addData(this.userData).subscribe(() => 
        {
          this.formData.reset(),
          this.router.navigate(['dashboard']) 
        })
    }

    else{
   
      this.userData = this.formData.value;
      this.userDataService.userEdit(this.editedUserId , this.userData).subscribe(() => console.log('Edited successfuly' , this.userData))
      this.formData.reset();
      this.router.navigate(['dashboard']) 

    }
  }




}
