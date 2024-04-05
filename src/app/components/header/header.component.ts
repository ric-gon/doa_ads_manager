import { Component } from '@angular/core';
import { FacebookLoginService } from '../../services/facebook-login.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private fbLoginService: FacebookLoginService){

  }

  getFacebookLoginService(){
    this.fbLoginService.initFBLogin();
  }
}
