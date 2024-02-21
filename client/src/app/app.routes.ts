import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {path:'', redirectTo:'/home', pathMatch:'full'},
    {path:'dashboard', component:DashboardComponent},
    {path:'login', component:LoginComponent},
    {path:'home', component:HomeComponent},
    {path:'profile', component:ProfileComponent}
];
