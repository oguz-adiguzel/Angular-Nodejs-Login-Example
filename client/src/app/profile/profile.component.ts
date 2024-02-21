import { Component, SimpleChange } from '@angular/core';
import { ProfileService } from '../profile.service';
import { NgIf } from '@angular/common';
import { Profile } from '../models/profile.model';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private profileService:ProfileService, private authService: AuthenticationService, private router:Router, private notificationService: NotificationService){}

  user:Profile={
    _id:'',
    username:'',
    password:''
  }

  ngOnInit(){
    this.getProfile()
  }

  getProfile():void{
    this.profileService.getProfile().subscribe(res=>{
      this.user = res.user
    },
    error => {
      this.notificationService.add({
        status:error.status,
        message:error.error.message
      })
    })
  }

  logOut():void{
    this.authService.logout();
    this.router.navigate([''])
  }
}
