import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FacebookLoginService } from '../../services/facebook-login.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private facebookLoginService: FacebookLoginService){
  }
  
  getFacebookLoginService(){
    this.facebookLoginService.initFBLogin();
  }
}
