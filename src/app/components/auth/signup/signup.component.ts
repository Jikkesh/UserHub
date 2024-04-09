import { Component, OnInit } from '@angular/core';
import { SignupData } from 'src/app/signup';
import { Router } from '@angular/router';
import { FormBuilder , FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../auth.service';
import { LoginData } from 'src/app/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  formData : FormGroup;
  signupData : SignupData;
  hide_pass : boolean = true;
  hide_con_pass : boolean = true;
  userData : LoginData;


  constructor(private router : Router,
              private formBuilder : FormBuilder,
              private authService : AuthService) {
   }

  ngOnInit(): void {
   
   this.formData = this.formBuilder.group({
    email : ["" , [Validators.email]   ] ,
    password : ["" , Validators.required],
    confirm_password : ["" , Validators.required]
   });

  }


  handleLoginClick(){
    this.router.navigate(["login"])
  }

  onSubmit(){

    this.signupData = this.formData.value

   if(this.signupData.password !== this.signupData.confirm_password){ 
     alert("Password Mismatch");  

   }else {

      this.userData = {
        email : this.signupData.email,
        password : this.signupData.password
      }

      this.authService.userSignup(this.userData).subscribe( (message) => { 
      
      if ( message["status"] == 200 ) {
          this.router.navigate(["login"])
          this.formData.reset()
      }
      else {
        alert("Try someother time")
      }

    })
    }
  }
   

  checkEmailValid() {
    const emailValid = this.formData.get('email')
  
    if(emailValid.hasError("required")){
     return "Enter the email"
     }
    else if(emailValid.hasError("email")){
  
     return "Email format invalid"
     }
    else{
      return ""
     }
   }
 
   invalidEmail(){

    const emailValid = this.formData.get('email')
    if(emailValid.invalid){
      return true;
    }
    else{
      return false;
    }

  }


}
