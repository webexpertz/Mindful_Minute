import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignedupPage } from './signedup';

@NgModule({
  declarations: [
    SignedupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignedupPage),
  ],
})
export class SignedupPageModule {}
