import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import { UserComponent } from './user.component';
import { UserService } from './user.service';

import {MatListModule} from '@angular/material/list';


@NgModule({
declarations : [
    UserComponent
],
imports : [
  RouterModule.forChild([
  {path: 'user/:id' , component: UserComponent }

  ]) ,

  MatListModule

],
providers : [
    UserService
]
})
export default class UserModule {}