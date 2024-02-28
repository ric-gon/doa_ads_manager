import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FacebookLoginService {
 
  /***
   * GET METHOD USING ACCESS TOKEN

  private readonly ACCESS_TOKEN: string = 'EAAOn9Rn9mVQBOZB9egTawmR3t7uevyraP9mVj4bamShhUHCLnID6B97L1wRlOZAM5qQ0GyAi1ZAQZBmZCLgfsDmQAJyUWkcOpBIQUqdSdzIxcnukcIR0yasmgaBB62BmfjOiJ50w2lPm8toJ7lcfgOjB2uGXLCpxVtd4ySWfFn1UeV7jTQBToIATeQ6wOQg4lRoZBsMYNriMdgqbHqHh9JzK9QXQZDZD';
  
  async FacebookAuthTest(): Promise<any> {
    const url = `https://graph.facebook.com/v19.0/me?fields=id,name&access_token=${this.ACCESS_TOKEN}`;
    const response = await fetch(url);
    return await response.json();
  }

  * END GET METHOD USING ACCESS TOKEN
   */
  
  constructor() {
    
  }
}
