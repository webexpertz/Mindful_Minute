import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoachingPage } from './coaching';

@NgModule({
  declarations: [
    CoachingPage,
  ],
  imports: [
    IonicPageModule.forChild(CoachingPage),
  ],
})
export class CoachingPageModule {}
