import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LessonplayerPage } from './lessonplayer';

@NgModule({
  declarations: [
    LessonplayerPage,
  ],
  imports: [
    IonicPageModule.forChild(LessonplayerPage),
  ],
})
export class LessonplayerPageModule {}
