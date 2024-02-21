import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule,NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'login';
  
  constructor(private authService: AuthenticationService, private router: Router){}

  ngOnInit(){
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/dashboard'])
    }else{
      this.router.navigate([''])
    }
  }

}
