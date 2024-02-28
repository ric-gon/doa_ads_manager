// import { FacebookLoginService } from '../facebook-login.service'; // GET METHOD USING ACCESS TOKEN
import { Component } from '@angular/core';

@Component({
  selector: 'app-fb-login',
  standalone: true,
  imports: [],
  templateUrl: './fb-login.component.html',
  styleUrl: './fb-login.component.css'
})
export class FbLoginComponent {
  
  
  loginWithFacebook() {
    const appId = '123456789';
    const redirectUri = encodeURI('https://digitaloptimizer.agency/');
    const facebookLoginUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&response_type=code`;
    /*
     https://www.facebook.com/dialog/oauth?
     client_id=123456789&
     response_type=code&
     redirect_uri=https%3A%2F%2Fscript.google.com%2Fmacros%2Fd%2F1GjtG0Hf9qgJADCung3Pv9Wrzg701XG4iFZUQcisElKatxEDR5Lkdzp0H%2Fusercallback&
     state=ADEpC8y3Tw3YS2tdMB05jeAAGwYy5cZM5uv92R6007uAddXA0ZsaXWYa5XSgzxlXINDsjcKHRow0Ldle5kkLgRAbX2xRcHjSqFRZTJxi1a8uZwB9BLNFqzpqqmawtYOd8vRqjDLblnoe4Pd3kRU3WFNApXkJ2CJTJWu9HX6WiAYWOu-e0OegbHdi-cj1pJ4RZIxbXAOj0n8t1rRYqILedt_rFzT5AipkCgdr0jtlnPKqUIWwORL_Mr4-7vWqQe83GHhoVMCncN8nYFSnZqCoRhAgkJvWPXZn6L7_I5ZuQyWkXtICNNeB0mQZYFDS20W3pDnNsTeuBPyi
     */

    window.location.href = facebookLoginUrl;
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
