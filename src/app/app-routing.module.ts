import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SaveGuard } from './guards/save.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from  './components/auth/signup/signup.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [

{ path : '', 
redirectTo : 'login' , 
pathMatch : 'full'},

{ path:'users' , 
component: HomeComponent, 
canActivate : [SaveGuard],
},

{path : 'user/:id', 
component : UserComponent
},

{ path: 'dashboard', 
component: DashboardComponent, 
canActivate : [SaveGuard],
},

{ path: 'register', 
component: RegisterComponent
},

{ path: 'edit/:id' ,
component : RegisterComponent},

{path : 'login' ,
component : LoginComponent

},
{path : 'signup' ,
component : SignupComponent

},


{ path: '**',
component: NotFoundComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
