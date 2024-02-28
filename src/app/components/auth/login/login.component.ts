import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoginData } from 'src/app/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  newUser: boolean = false;
  formData: FormGroup;
  hide: boolean = true;

  loginData: LoginData;


  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      email: ['', Validators.email],
      password: [null]
    });
  }

  invalidEmail() {
    const emailValid = this.formData.get('email')

    if (emailValid.invalid) {
      return true;
    }
    else {
      return false;
    }
  }

  checkEmailValid() {
    const emailValid = this.formData.get('email')

    if (emailValid.hasError("required")) {
      return "Enter the email"
    }
    else if (emailValid.hasError("email")) {

      return "Email format invalid"
    }
    else {
      return ""
    }
  }

  handleSignupClick() {
    this.newUser = !this.newUser;

  }

  onSubmit() {

    this.loginData = this.formData.value
    this.authService.userLogin(this.loginData).subscribe((message) => {

      if (message["status"] == 200) {
        this.authService.loggedCall(true)
        this.router.navigate(["users"])
        this.formData.reset()
      }
      else {
        alert("Try someother time")
      }
    })
  }







}
