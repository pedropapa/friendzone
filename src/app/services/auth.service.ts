import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public facebookAuthData: {
    session_key: boolean;
    accessToken: string;
    expiresIn: number;
    sig: string;
    secret: string;
    userID: string;
  };

  public facebookUserData: {
    id: string,
    name: string,
    picture: {
      data: {
        height: number,
        is_silhouette: boolean,
        url: string,
        width: number,
      }
    }
  };

  constructor(platform: Platform) {
    if (!platform.is('cordova')) {
      this.facebookUserData = {
        'name': 'Gabii Carvalho',
        'id': '2898975973452979',
        'picture': {
          'data': {
            'height': 200,
            'is_silhouette': false,
            'url': 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2898975973452979&height=200&width=200&ext=1562941992&hash=AeRTsTtAAQltuA20',
            'width': 200
          }
        }
      };
    }
  }
}
