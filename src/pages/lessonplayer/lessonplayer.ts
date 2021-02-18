import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
/**
 * Generated class for the LessonplayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lessonplayer',
  templateUrl: 'lessonplayer.html',
})
export class LessonplayerPage {
  media_url: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private backgroundMode: BackgroundMode) {
    this.media_url = navParams.get('mykey');

  }

 
  //import { BackgroundMode } from '@ionic-native/background-mode';
  //private backgroundMode: BackgroundMode
  ionViewDidLeave(){
    this.backgroundMode.enable();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonplayerPage');
  }

}
