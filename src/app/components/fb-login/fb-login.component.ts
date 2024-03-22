import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-fb-login',
  standalone: true,
  imports: [],
  templateUrl: './fb-login.component.html',
  styleUrl: './fb-login.component.css'
})
export class FbLoginComponent {
    
  loginWithFacebook() {
    const appId = environment.FB_APP_ID;
    const redirectUri = encodeURIComponent('https://adsmanager.digitaloptimizer.agency/fb');
    const facebookLoginUrl = `https://www.facebook.com/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&response_type=code`;
    const popup = window.open(facebookLoginUrl, "Facebook Login", "width=600,height=400");

    console.log(environment.FB_APP_ID)

    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        window.location.href = facebookLoginUrl;
    }
  }
  
  /***
   * GET METHOD USING ACCESS TOKEN
  
  constructor(private fbLoginService: FacebookLoginService) {}

  ngOnInit() {
    this.testFacebookAuth();
  }

  async testFacebookAuth() {
    try {
      const response = await this.fbLoginService.FacebookAuthTest();
      console.log(response);
    } catch (error) {
      console.error("error: ", error);
    }
  }
   * END GET METHOD USING ACCESS TOKEN
   */
}
