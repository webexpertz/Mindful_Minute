import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MasterclassPage } from './masterclass';

@NgModule({
  declarations: [
    MasterclassPage,
  ],
  imports: [
    IonicPageModule.forChild(MasterclassPage),
  ],
})
export class MasterclassPageModule {}
