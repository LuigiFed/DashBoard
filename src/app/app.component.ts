import { Component, inject } from '@angular/core';
import { getMessaging, getToken, Messaging, onMessage } from '@angular/fire/messaging';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { initializeApp } from '@angular/fire/app';
import { InstallPromptService } from './services/install-prompt.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DashBoard';

  private messaging = inject(Messaging);
  constructor(private installPromptService: InstallPromptService) {}



  ngOnInit(): void {

  }



}
