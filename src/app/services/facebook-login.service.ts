import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from "@angular/common";
import { FacebookApiService } from './facebook-api.service';

declare global {
  interface Window {
      fbAsyncInit: () => void;
      FB: any;
  }
} 

@Injectable({
  providedIn: 'root'
})
export class FacebookLoginService {
  public userAccessToken: string = '';
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private facebookApiService: FacebookApiService
  ) {
  }

  initializeFacebookSDK(): void {
    if (isPlatformBrowser(this.platformId)) {
      
      (function(d: Document, s: string, id: string){
        let fjs: HTMLElement | null = d.getElementsByTagName(s)[0] as HTMLElement;
        if (d.getElementById(id)) {return;}
        let js: HTMLScriptElement = d.createElement(s) as HTMLScriptElement;
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        if (fjs) fjs.parentNode?.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
        
      window.fbAsyncInit = () => {
        window.FB.init({ 
          appId: environment.FB_APP_ID,
          cookie: true,
          xfbml: true,
          version: 'v19.0'
        });

        window.FB.AppEvents.logPageView();
      };
    }
  }

  initFBLogin() {
    window.FB.login((response: any) => {
      if (response.authResponse){
        console.log('Welcome!  Fetching your information.... ');
        this.facebookApiService.getUserGeneralAccountData();
        /*window.FB.api('/me', {fields: 'name, email'}, function(response: any) {
          console.log("Good to see you, " + response.name + ". i see your email address is " + response.email);
        });*/
        window.location.href = 'https://adsmanager.digitaloptimizer.agency/';
      } else {
        console.log('User cancelled login or did not fully authorize.'); 
      }
    }, {scope: 'public_profile,email'});
  }

  /* 
  getLoginStatus(): void{
    window.FB.getLoginStatus((response: any) => {
      if (response.status === 'connected' ){
        console.log('Connected User...');
        return 'Connected User...';
      } else {
        console.warn('Please Log In to use this app', response.status);
        return 'Please Log In to use this app';
      }
    }); 
  } 
  */

  setUserAccessToken(): void {
    window.FB.getLoginStatus( (response: any) => {
      this.userAccessToken = response.authResponse.accessToken;
    });
  }

  getUserAccessToken(): string {
    return this.userAccessToken;
  }
}
