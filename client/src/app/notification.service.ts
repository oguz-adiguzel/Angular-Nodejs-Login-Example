import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  messages: any[] = []

  add(message: any): void {
    this.messages.push(message)
    setTimeout(() => {
      this.clear();
    }, 3000);
  }

  clear(): void {
    this.messages = []
  }

  getMessage() {
    return this.messages
  }

  constructor() { }
}
