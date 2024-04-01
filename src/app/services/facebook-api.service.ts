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
        console.log("Token in FB Api Service: ", this.userAccessToken);
        window.FB.api(
          '/me',
          'GET',
          {
            'fields': 'id,name,adaccounts{campaigns{name}}',
            access_token: this.userAccessToken
          }, (response: any) => {
            console.log('response: ', response);
            console.log('response typeOf: ', typeof (response));
            resolve(response);
          }
        );
      }
    });
  }
}
