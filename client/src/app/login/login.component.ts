import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string | undefined;
  password: string | undefined;

  constructor(private authSevice: AuthenticationService, private router: Router, private notificationService:NotificationService){}

  login(): void {
    this.authSevice.login(this.username, this.password).subscribe(
      response=>{
        if(response && response.token){
          this.authSevice.setToken(response.token);
          this.notificationService.add({
            status: response.status,
            message: response.message
          })
          this.router.navigate(['/dashboard']);
        }
      },error=>{
        this.notificationService.add({
          status:error.status,
          message:error.error.message
        })
      }
      
    )
  }
}
