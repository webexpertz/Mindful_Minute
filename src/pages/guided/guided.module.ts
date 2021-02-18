import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuidedPage } from './guided';

@NgModule({
  declarations: [
    GuidedPage,
  ],
  imports: [
    IonicPageModule.forChild(GuidedPage),
  ],
})
export class GuidedPageModule {}
