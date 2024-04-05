import { environment } from '../../environments/environment';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";

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
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  initializeFacebookSDK(): void {
    console.log('triggered.');
    if (isPlatformBrowser(this.platformId)) {

      (function (d: Document, s: string, id: string) {
        let fjs: HTMLElement | null = d.getElementsByTagName(s)[0] as HTMLElement;
        if (d.getElementById(id)) { return; }
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

        window.FB.getLoginStatus((params: any) => {
          this.setUserAccessToken(params.authResponse.accessToken);
        })
      };
    }
  };

  initFBLogin() {
    window.FB.login((response: any) => {
      if (response.authResponse) {
        window.FB.getLoginStatus((params: any) => {
          this.setUserAccessToken(params.authResponse.accessToken);
        })
        window.location.href = 'https://adsmanager.digitaloptimizer.agency/';
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'public_profile,email' });
  }

  setUserAccessToken(userAccessToken: string): void {
    this.userAccessToken = userAccessToken;
  }

  getUserAccessToken(): string {
    return this.userAccessToken;
  }
}
