import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { URLSearchParams } from '@angular/http';
import { Backend } from '../../providers/backend';
import { Token } from '../../pages/token/token';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  response: any;
  constructor(public backend:Backend, private iab: InAppBrowser, public navCtrl: NavController) {

  }

  signIn(){
    // const browser = this.iab.create('https://login.microsoftonline.com/sudhanshujashoria.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_tuco1&client_id=6dcdf590-36c8-46f5-aaf2-31de92f4bd7a&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%2FtucoAzure%2F&scope=https%3A%2F%2Fsudhanshujashoria.onmicrosoft.com%2Fnotes%2Fread+openid+offline_access&response_type=code+id_token&prompt=login');
    const browser = this.iab.create('https://login.microsoftonline.com/DeveloperDynamicsTest.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_DefaultPolicy&client_id=9c3022fc-97b2-4a5d-9b31-d8c2cf144f72&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%2FScourCardScan&scope=https%3A%2F%2FDeveloperDynamicsTest.onmicrosoft.com%2Fnotes%2Fread+openid+offline_access&response_type=code+id_token&prompt=login');

    browser.on('loadstart').subscribe( (event) => {
      // alert(event.url);
      let params = new URLSearchParams(event.url.split('#')[1]);
        // let access_token = params.get('access_token');
        let code = params.get('code');
        let id_token = params.get('id_token');
        // alert(code);
        if(code != null){
          browser.close();
          this.backend.loadSnipping();
          localStorage.setItem('code', code);
          localStorage.setItem('id_token', id_token);
          this.backend.microsoft().subscribe( data => {
                // alert(data);
                
                this.response = data;
                let refreshToken = JSON.parse(this.response._body);
                refreshToken = refreshToken.refresh_token;
                localStorage.setItem('refreshToken', refreshToken);
                // alert(refreshToken);
                this.response = JSON.stringify(this.response._body);
                this.navCtrl.setRoot(Token, { response: this.response})
                this.backend.closeLoading();
             })
        }
        
    })
  }

}
