import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Token } from './token';

@NgModule({
  declarations: [
    Token,
  ],
  imports: [
    IonicPageModule.forChild(Token),
  ],
  exports: [
    Token
  ]
})
export class TokenModule {}
