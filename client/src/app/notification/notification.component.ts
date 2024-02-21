import { Component, DoCheck } from '@angular/core';
import { NotificationService } from '../notification.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'notification',
  standalone: true,
  imports: [NgIf],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent{

  constructor(public notificationService: NotificationService){}
}
