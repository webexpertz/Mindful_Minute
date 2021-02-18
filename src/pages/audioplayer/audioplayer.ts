import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';

/**
 * Generated class for the AudioplayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-audioplayer',
  templateUrl: 'audioplayer.html',
})
export class AudioplayerPage {

  url: any;
  title:any;
  file:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private backgroundMode: BackgroundMode) {
    this.url = navParams.get('url');
    this.title = navParams.get('title');
    this.file=navParams.get('file')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AudioplayerPage');
  }
  //import { BackgroundMode } from '@ionic-native/background-mode';
  //private backgroundMode: BackgroundMode
  ionViewDidLeave(){
    this.backgroundMode.enable();
  }
  // ngOnDestroy(){
  //  this.backgroundMode.disable()
  // }

}
