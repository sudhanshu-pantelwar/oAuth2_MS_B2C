import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Backend } from '../../providers/backend';
import { HomePage } from '../../pages/home/home';
/**
 * Generated class for the Token page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-token',
  templateUrl: 'token.html',
})
export class Token {
  response: any;
  response1: any;
  refreshToken: any;
  constructor(private backend: Backend, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Token');
    this.response = this.navParams.get('response');
  }

  refresh_token(){
    this.backend.refresh_token().subscribe( data => {
      console.log(data);
      this.response1 = data;
      this.response1 = JSON.parse(this.response1._body);
      localStorage.setItem('refreshToken', this.response1.refresh_token);
      alert("new Response Token "+this.response1.refresh_token);
    })
  }

  logout(){
    localStorage.clear();
    this.navCtrl.setRoot(HomePage);
  }

}
