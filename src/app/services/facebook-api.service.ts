import { FacebookLoginService } from './facebook-login.service';
import { Injectable } from '@angular/core';

declare global {
  interface Window {
    FB: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class FacebookApiService {

  userAccessToken: string = this.facebookLoginService.getUserAccessToken();

  constructor(private facebookLoginService: FacebookLoginService) { }

  getUserGeneralAccountData(): void {
    window.FB.api(
      '/me',
      { fields: 'name, email' },
      (response: any) => {
        console.log("Good to see you, " + response.name + ". i see your email address is " + response.email);
      });
  }

  async getAdAccountData(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (typeof window !== 'undefined') {
        window.FB.api(
          '/me',
          'GET',
          {
            'fields': 'adaccounts{name,id,campaigns{name,id,adsets{name,id,adcreatives{name,id}}}}',
          }, (response: any) => {
            console.log('response: ', response);
            resolve(response);
          }
        );
      }
    });
  }
}
