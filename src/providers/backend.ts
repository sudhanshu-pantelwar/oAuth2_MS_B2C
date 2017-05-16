import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Http, Headers , RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the Backend provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Backend {
  loading: any;
  clientId: any='';
  clientSecret: any='';
  scope: any = 'https://DeveloperDynamicsTest.onmicrosoft.com/notes/read offline_access';
  redirectURI: any = 'https://www.developerdynamics.com/ScourCardScan';
  constructor(public loadingCtrl: LoadingController ,public http: Http) {
    console.log('Hello Backend Provider');
  }

microsoft(){
  let code = localStorage.getItem('code');
  let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  let options = new RequestOptions({ headers: headers });
  let url = 'https://login.microsoftonline.com/DeveloperDynamicsTest.onmicrosoft.com/oauth2/v2.0/token?p=B2C_1_DefaultPolicy';
  let body = 'grant_type=authorization_code'+'&client_id='+this.clientId+'&scope='+this.scope+'&code='+code+'&redirect_uri='+this.redirectURI+'&client_secret='+this.clientSecret;
  console.log(body);
  return this.http.post(url, body, options)
    .map(res => res);
}

refresh_token(){
  let refreshToken = localStorage.getItem('refreshToken');
  let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  let options = new RequestOptions({ headers: headers});
  let url = 'https://login.microsoftonline.com/DeveloperDynamicsTest.onmicrosoft.com/oauth2/v2.0/token?p=B2C_1_DefaultPolicy';
  let body = 'grant_type=refresh_token'+'&client_id='+this.clientId+'&scope='+this.scope+'&refresh_token='+refreshToken+'&redirect_uri='+this.redirectURI+'&client_secret='+this.clientSecret;
  console.log(body);
  return this.http.post(url, body, options)
    .map(res => res);
  }

  loadSnipping(){
    
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    this.loading.present();
  }
  
  closeLoading(){
    this.loading.dismiss();
  }
}
