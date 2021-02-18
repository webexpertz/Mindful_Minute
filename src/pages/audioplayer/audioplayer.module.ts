import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AudioplayerPage } from './audioplayer';

@NgModule({
  declarations: [
    AudioplayerPage,
  ],
  imports: [
    IonicPageModule.forChild(AudioplayerPage),
  ],
})
export class AudioplayerPageModule {}
