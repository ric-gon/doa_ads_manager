import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FacebookLoginService } from './services/facebook-login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Digital Optimizer Agency | Ads Manager';

  constructor(private facebookLoginService: FacebookLoginService) {

  }

  ngOnInit(): void {
    this.facebookLoginService.initializeFacebookSDK();
  }
}