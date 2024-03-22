import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FacebookLoginService } from '../../services/facebook-login.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private fbLoginService: FacebookLoginService){
  }
  
  getFacebookLoginService(){
    this.fbLoginService.initFBLogin();
  }
}
