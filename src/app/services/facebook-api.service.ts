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

  constructor() { }

  getUserGeneralAccountData(): void {
    window.FB.api('/me', {fields: 'name, email'}, function(response: any) {
      console.log("Good to see you, " + response.name + ". i see your email address is " + response.email);
    });
  }

  getAdAccountData(): void {

    let userAccessToken: string = '';

    window.FB.getLoginStatus( (response: any) => {
      userAccessToken = response.authResponse.accessToken;
    });

    if (typeof window !== 'undefined'){
      console.log(userAccessToken);
      window.FB.api(
        '/me',
        'GET', 
        {
          'fields': 'id,name,adaccounts{campaigns{name}}', 
          access_token: userAccessToken
        }, function (response: string) {
          console.log('response: ', response);
          console.log('response typeOf: ', typeof(response));
        }
      );
    }
  }
}
