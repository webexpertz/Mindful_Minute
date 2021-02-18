import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
@Component({
  selector: 'page-videoplayer',
  templateUrl: 'videoplayer.html',
})
export class VideoplayerPage {

  media_url: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private backgroundMode: BackgroundMode) {
    this.media_url = navParams.get('mykey');
  }

  videoEnded() {

  }
   //import { BackgroundMode } from '@ionic-native/background-mode';
  //private backgroundMode: BackgroundMode
  ionViewDidLeave(){
    this.backgroundMode.enable();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoplayerPage');
  }

}
